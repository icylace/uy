import type { Focus } from "eyepiece"
import type {
  Action, ClassProp, EffectDescriptor, EffectfulState,
  Payload, State, VDOM, VNode,
} from "hyperapp"

import { get, set } from "eyepiece"
import { input, label, li, span, ul } from "ntml"
import { popup } from "../../wireless/container/popup"
import { box } from "../../wireless/container/box"
import { icon } from "../../wireless/indicator/icon"

export type SearchboxData = {
  value: string
  results: string[]
  searching: boolean
  focused?: boolean
}

export type SearchEffectData<S> = {
  action: Action<S, SearchboxData>
  value: string
}

export type SearchboxOptions<S> = {
  id: string
  search: (action: Action<S, SearchboxData>, value: string) => EffectDescriptor<S, SearchEffectData<S>>
  onresults: (results: SearchboxData["results"], id: string, state: State<S>) => State<S>
  class?: ClassProp
  disabled?: boolean
}

const freshSearchbox = (value: string): SearchboxData => ({
  value,
  results: [],
  searching: false,
  focused: false,
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

const searchbox = <S>(options: SearchboxOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, search, onresults, id, ...etc } = options

    const x = get<SearchboxData>(focus)(state)

    const updateResults = (state: State<S>, props?: Payload<SearchboxData>): State<S> | EffectfulState<S> => {
      const r = get<SearchboxData>(focus)(state)

      const { value, results } = props ?? { value: "", results: [] }

      // It is possible the current value of the searchbox and the value that was
      // actually searched on could be out of sync if the user continues changing
      // the searchbox value during the search. In that case another search gets
      // triggered using the new current searchbox value.

      if (r.value !== value) {
        return [
          set<State<S>>(focus, "searching")(true)(state) ?? state,
          search(updateResults, r.value),
        ]
      }

      return onresults(results, id, set<State<S>>(focus)(
        (xr: SearchboxData): SearchboxData => ({ ...xr, results, searching: false })
      )(state) ?? state)
    }

    const update = (value: string) => (state: State<S>): State<S> | EffectfulState<S> => {
      const r = get<SearchboxData>(focus)(state)
      return r.searching
        ? set<State<S>>(focus, "value")(value)(state) ?? state
        : [
          set<State<S>>(focus)(
            (xr: SearchboxData): SearchboxData =>
              ({ ...xr, value, searching: true })
          )(state) ?? state,
          search(updateResults, value),
        ]
    }

    const inputSearch = input<S>({
      type: "search",
      value: x.value,
      disabled,
      onfocus: (state) => set<State<S>>(focus, "focused")(true)(state) ?? state,
      onblur: (state) => set<State<S>>(focus, "focused")(false)(state) ?? state,
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

    const searchResult = (result: string): VDOM<S> =>
      li({
        onclick: (state: State<S>): State<S> =>
          onresults([], id,
            set<State<S>>(focus)(
              (xr: SearchboxData): SearchboxData =>
                ({ ...xr, value: result, results: [] })
            )(state) ?? state
          ),
      }, result)

    const popupNode = (
      x.results.length && !disabled
        ? popup(
          { disabled, id },
          [ul(
            { class: "uy-searchbox-results uy-scroller" },
            x.results.map(searchResult),
          )]
        )
        : null
    ) as VNode<S>

    return box(["uy-control uy-searchbox", { disabled }] , [
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
          [icon({
            fas: true,
            "fa-spinner": x.searching,
            "fa-pulse": x.searching,
            "fa-search": !x.searching,
          })],
        ),
      ]),
      popupNode,
    ])
  }
}

export { freshSearchbox, searchbox }
