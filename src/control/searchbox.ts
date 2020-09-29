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
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { input, label, li, span, ul } from "ntml"
import { pipe } from "../utility/utility"
import { get, set } from "../utility/shadesHelper"
import { addInsideEl, removeInsideEl } from "../utility/uyHelper"
import { component } from "../component"
import { popup } from "../container/popup"
import { box } from "../container/box"
import { icon } from "../display/icon"

export type Searcher<S> =
  (action: Action<S, SearchboxData>) => (value: string) => EffectDescriptor<S, string>

export type SearchboxOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  path: Path
  search: Searcher<S>
}

export type SearchboxData = {
  focused: boolean
  results: string[]
  searching: boolean
  value: string
}

export const freshSearchbox = (value: string): SearchboxData => ({
  value,
  focused: false,
  searching: false,
  results: [],
})

// -----------------------------------------------------------------------------

const chooseResult = (path: Path, id: string, value: string) => {
  return <S>(state: State<S>): State<S> => {
    return pipe(
      set([...path, "results"])([]),
      set([...path, "value"])(value),
      removeInsideEl(id),
    )(state)
  }
}

const updateResults = <S>(search: Searcher<S>, path: Path, id: string) => {
  return (state: State<S>, props?: Payload<SearchboxData>): State<S> | EffectfulState<S> => {
    const { value, results } = props ?? { value: "", results: [] }

    // It is possible the current value of the searchbox and the value that was
    // actually searched on could be out of sync if the user continues changing
    // the searchbox value during the search. In that case another search gets
    // triggered using the new current searchbox value.

    const curValue = get([...path, "value"])(state) as string

    if (curValue !== value) {
      return [
        set([...path, "searching"])(true)(state),
        search(updateResults(search, path, id))(curValue),
      ]
    }

    const newState = pipe(
      set([...path, "searching"])(false),
      set([...path, "results"])(results),
    )(state) as State<S>

    return results.length
      ? addInsideEl(id, set([...path, "results"])([]))(newState)
      : removeInsideEl(id)(newState)
  }
}

const update = <S>(search: Searcher<S>, path: Path, id: string, value: string) => {
  return (state: State<S>): State<S> | EffectfulState<S> => {
    return get([...path, "searching"])(state)
      ? set([...path, "value"])(value)(state)
      : [
        pipe(
          set([...path, "searching"])(true),
          set([...path, "value"])(value),
        )(state) as State<S>,
        search(updateResults(search, path, id))(value),
      ]
  }
}

// -----------------------------------------------------------------------------

const searchResult = (path: Path, id: string) => <S>(x: string): VDOM<S> =>
  li<S>({ onclick: chooseResult(path, id, x) }, x)

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

const rawSearchbox = <S>(props: SearchboxOptions<S>, data: SearchboxData): VDOM<S> => {
  const { disabled, locked, path, search, ...etc } = props
  const id = path.join("-")

  const inputSearch = input<S>({
    disabled,
    readonly: locked,
    value: data.value,
    type: "search",
    onfocus: set([...path, "focused"])(true),
    onblur: set([...path, "focused"])(false),
    onkeyup: (state, event) => {
      if (!event) return state
      if (noopKeys.includes(event.key)) return state
      const target = event.target as HTMLInputElement
      return update(search, path, id, target.value)(state)
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
      return update(search, path, id, target.value)(state)
    },
    ...etc,
    class: cc(["uy-input", { locked, disabled }, etc.class]),
  })

  const popupNode = (
    data.results.length && !disabled
      ? popup(
        { locked, disabled, id },
        [
          ul(
            { class: "uy-searchbox-results uy-scroller" },
            data.results.map(searchResult(path, id)),
          ),
        ]
      )
      : null
  ) as VNode<S>

  return box({
    disabled,
    locked,
    "uy-control": true,
    "uy-searchbox": true,
  }, [
    label({
      class: {
        "uy-searchbox-label": true,
        focus: data.focused,
        busy: data.searching,
        locked,
        disabled,
      },
    }, [
      inputSearch,
      span(
        { onclick: update(search, path, id, data.value) },
        [
          icon({
            fas: true,
            "fa-spinner": data.searching,
            "fa-pulse": data.searching,
            "fa-search": !data.searching,
          }),
        ],
      ),
    ]),
    popupNode,
  ])
}

export const searchbox = component(rawSearchbox)
