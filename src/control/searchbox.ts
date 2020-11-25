import type {
  Action,
  ClassProp,
  EffectDescriptor,
  EffectfulState,
  Payload,
  State,
  VDOM,
  VNode,
} from "hyperapp"
import type { Wiring } from "../component"

import { input, label, li, span, ul } from "ntml"
import { popup } from "../container/popup"
import { box } from "../container/box"
import { icon } from "../indicator/icon"

export type Searcher<S, D> = (action: Action<S, SearchboxData>) => (value: string) => EffectDescriptor<S, D>

export type SearchboxData = {
  focused: boolean
  results: string[]
  searching: boolean
  value: string
}

export type SearchboxOptions<S, D> = {
  class?: ClassProp
  disabled?: boolean
  search: Searcher<S, D>
  onresults: (results: SearchboxData["results"], id: string, state: State<S>) => State<S>
  id: string
}

const freshSearchbox = (value: string): SearchboxData => ({
  focused: false,
  results: [],
  searching: false,
  value,
})

// -----------------------------------------------------------------------------

// We don't let certain keys unnecessarily affect searching.
const noopKeys = [
  "Alt",
  "ArrowLeft",
  "ArrowRight",
  "CapsLock",
  "Control",
  "End",
  "Home",
  "Hyper",
  "Meta",
  "NumLock",
  "ScrollLock",
  "Shift",
  "Super",
]

const searchbox = <S>(options: SearchboxOptions<S, any>) => (wiring: Wiring<SearchboxData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, search, onresults, id, ...etc } = options

  const x = wiring.get(state)

  const updateResults = (state: State<S>, props?: Payload<SearchboxData>): State<S> | EffectfulState<S> => {
    const r = wiring.get(state)

    const { value, results } = props ?? { value: "", results: [] }

    // It is possible the current value of the searchbox and the value that was
    // actually searched on could be out of sync if the user continues changing
    // the searchbox value during the search. In that case another search gets
    // triggered using the new current searchbox value.

    if (r.value !== value) {
      return [
        wiring.set(state, { ...r, searching: true }),
        search(updateResults)(r.value),
      ]
    }

    return onresults(results, id, wiring.set(state, {
      ...r,
      results,
      searching: false,
    }))
  }

  const update = (value: string) => {
    return (state: State<S>): State<S> | EffectfulState<S> => {
      const r = wiring.get(state)
      return r.searching
        ? wiring.set(state, { ...r, value })
        : [
          wiring.set(state, { ...r, value, searching: true }),
          search(updateResults)(value),
        ]
    }
  }

  const inputSearch = input<S>({
    disabled,
    value: x.value,
    type: "search",
    onfocus: (state) => wiring.set(state, { ...x, focused: true }),
    onblur: (state) => wiring.set(state, { ...x, focused: false }),
    onkeyup: (state, event) => {
      if (!event) return state
      if (noopKeys.includes(event.key)) return state
      const target = event.target as HTMLInputElement
      return update(target.value)(state)
    },
    // Here we're using the non-standard `search` event because it can detect
    // when a searchbox's clear button is used. The `input` event can also
    // detect it but it will also detect keypresses which makes things
    // less convenient since it would conflict with how we're using
    // the `keyup` event.
    // https://stackoverflow.com/a/25569880
    onsearch: (state, event) => {
      if (!event) return state
      const target = event.target as HTMLInputElement
      return update(target.value)(state)
    },
    ...etc,
    class: ["uy-input", { disabled }, etc.class],
  })

  const searchResult = (result: string): VDOM<S> => {
    return li<S>({
      onclick: (state: State<S>): State<S> => {
        return onresults([], id, wiring.set(state, {
          ...wiring.get(state),
          value: result,
          results: [],
        }))
      },
    }, result)
  }

  const popupNode = (
    x.results.length && !disabled
      ? popup(
        { disabled, id },
        [
          ul(
            { class: "uy-searchbox-results uy-scroller" },
            x.results.map(searchResult),
          ),
        ]
      )
      : null
  ) as VNode<S>

  return box({
    disabled,
    "uy-control": true,
    "uy-searchbox": true,
  }, [
    label({
      class: {
        "uy-searchbox-label": true,
        focus: x.focused,
        busy: x.searching,
        disabled,
      },
    }, [
      inputSearch,
      span(
        { onclick: update(x.value) },
        [
          icon({
            fas: true,
            "fa-spinner": x.searching,
            "fa-pulse": x.searching,
            "fa-search": !x.searching,
          }),
        ],
      ),
    ]),
    popupNode,
  ])
}

export { freshSearchbox, searchbox }
