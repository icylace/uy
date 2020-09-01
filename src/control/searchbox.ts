import type { Payload, State, Transition, VDOM } from "hyperapp"
import type { ComponentOptions, Control, Path } from "../types"

import cc from "classcat"
import { input, label, li, span, ul } from "ntml"
// import { get, set } from "shades"
import { pipe } from "../utility/utility"
import { get, set } from "../utility/shadesHelper"
import { addInsideEl, removeInsideEl } from "../utility/uyHelper"
import { component } from "../component"
import { popup } from "../container/popup"
import { box } from "../container/box"
import { icon } from "../display/icon"

export type SearchboxOptions = ComponentOptions & {
  path: Path
  search: Function
}

export type SearchboxData = {
  [_: string]: unknown
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

const chooseResult = (path: Path) => (id: string) => (value: string) => <S>(state: State<S>): State<S> =>
  pipe (
    set ([...path, "results"]) ([]),
    set ([...path, "value"]) (value),
    removeInsideEl (id),
  ) (state)

// updateResults :: AnyFunction -> Path -> String -> State -> Payload -> Action
const updateResults = (search: Function) =>
  (path: Path) =>
    (id: string) =>
      <S, P extends SearchboxData, D>(
        state: State<S>,
        { value, results }: Payload<P>,
      ): Transition<S, P, D> => {
        // It is possible the current value of the searchbox and the value that was
        // actually searched on could be out of sync if the user continues changing
        // the searchbox value during the search. In that case another search gets
        // triggered using the new current searchbox value.

        const curValue = get ([...path, "value"]) (state)

        if (curValue !== value) {
          return [
            set ([...path, "searching"]) (true) (state),
            search (updateResults (search) (path) (id)) (curValue),
          ]
        }

        const newState = pipe (
          set ([...path, "searching"]) (false),
          set ([...path, "results"]) (results),
        ) (state)

        return results.length
          ? addInsideEl (id) (set ([...path, "results"]) ([])) (newState)
          : removeInsideEl (id) (newState)
      }

// update :: (Action -> String -> State) -> Path -> String -> String -> State -> Action
const update = (search: Function) =>
  (path: Path) =>
    (id: string) =>
      (value: string) =>
        <S, P, D>(state: State<S>): Transition<S, P, D> =>
          get ([...path, "searching"]) (state)
            ? set ([...path, "value"]) (value) (state)
            : [
              pipe (
                set ([...path, "searching"]) (true),
                set ([...path, "value"]) (value),
              ) (state),
              search (updateResults (search) (path) (id)) (value),
            ]

// -----------------------------------------------------------------------------

const searchResult = (path: Path) => (id: string) => (x: string): VDOM =>
  li ({ onclick: chooseResult (path) (id) (x) }, x)

const rawSearchbox = ({ disabled, locked, path, search, ...etc }: SearchboxOptions) => (data: SearchboxData): VDOM => {
  const id = path.join ("-")

  const inputSearch = input ({
    disabled,
    readonly: locked,
    value: data.value,
    type: "search",
    onfocus: set ([...path, "focused"]) (true),
    onblur: set ([...path, "focused"]) (false),
    onkeyup: <S, P extends KeyboardEvent, D>(
      state: State<S>,
      { key, target }: Payload<P>,
    ): Transition<S, P, D> => {
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
      if (noopKeys.includes (key)) {
        return state
      }
      const el = target as HTMLInputElement
      return update (search) (path) (id) (el.value) (state)
    },

    // Here we're using the non-standard `search` event because it can detect
    // when a searchbox's clear button is used. The `input` event can also
    // detect it but it will also detect keypresses which makes things
    // less convenient since it would conflict with how we're using
    // the `keyup` event.
    // https://stackoverflow.com/a/25569880
    onsearch: <S, P extends Event, D>(
      state: State<S>,
      { target }: Payload<P>,
    ): Transition<S, P, D> => {
      const el = target as HTMLInputElement
      return update (search) (path) (id) (el.value) (state)
    },

    ...etc,

    class: cc (["uy-input", { locked, disabled }, etc.class]),
  })

  return box ({
    disabled,
    locked,
    "uy-control": true,
    "uy-searchbox": true,
  }) ([
      label ({
        class: {
          "uy-searchbox-label": true,
          focus: data.focused,
          busy: data.searching,
          locked,
          disabled,
        },
      }, [
        inputSearch,
        span ({ onclick: update (search) (path) (id) (data.value) }, [
          icon ({
            fas: true,
            "fa-spinner": data.searching,
            "fa-pulse": data.searching,
            "fa-search": !data.searching,
          }),
        ]),
      ]),

      data.results.length && !disabled
        ? popup ({ locked, disabled, id }) ([
          ul (
            { class: "uy-searchbox-results uy-scroller" },
            data.results.map (searchResult (path) (id)),
          ),
        ])
        : null,
  ])
}

export const searchbox: Control = component (rawSearchbox)
