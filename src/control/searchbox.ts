import { h } from "hyperapp"
import { component } from "../component"
import { popup } from "../container/popup"
import { box } from "../container/ui"
import { icon } from "../display/icon"
import { get, set } from "../utility/shadesHelper"
import { addInsideEl, removeInsideEl } from "../utility/uyHelper"
import { pipe } from "../utility/utility"

// freshSearchbox :: String -> SearchboxData
const freshSearchbox = (value: string): any => ({
  value,
  focused: false,
  searching: false,
  results: [],
})

// -----------------------------------------------------------------------------

// chooseResult :: [String] -> String -> String -> State -> State
const chooseResult = (path: string[]) => (id: string) => (value: string): any =>
  pipe ([
    set ([...path, "results"]) ([]),
    set ([...path, "value"]) (value),
    removeInsideEl (id),
  ])

// updateResults :: AnyFunction -> [String] -> String -> Object -> State -> Any
const updateResults = (search: Function) => (path: string[]) => (id: string) => ({ value, results }: any) => (state: any): any => {
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

  const newState = pipe ([
    set ([...path, "searching"]) (false),
    set ([...path, "results"]) (results),
  ]) (state)

  return results.length
    ? addInsideEl (id) (set ([...path, "results"]) ([])) (newState)
    : removeInsideEl (id) (newState)
}

// update :: (Action -> String -> State) -> [String] -> String -> String -> State -> State | [State, Effect]
const update = (search: Function) => (path: string[]) => (id: string) => (value: string) => (state: any): any => {
  return get ([...path, "searching"]) (state)
    ? set ([...path, "value"]) (value) (state)
    : [
      pipe ([
        set ([...path, "searching"]) (true),
        set ([...path, "value"]) (value),
      ]) (state),
      search (updateResults (search) (path) (id)) (value),
    ]
}

// -----------------------------------------------------------------------------

// searchResult :: [String] -> String -> String -> VNode
const searchResult = (path: string[]) => (id: string) => (x: string): any => {
  return h ("li", { onclick: chooseResult (path) (id) (x) }, [x])
}

// rawSearchbox :: ControlOptions -> Object -> VNode
const rawSearchbox = ({ disabled, locked, path, search, ...etc }: any) => (data: any): any => {
  const id = path.join ("-")

  const inputSearch = h ("input", {
    disabled,
    readonly: locked,
    value: data.value,
    type: "search",
    onfocus: set ([...path, "focused"]) (true),
    onblur: set ([...path, "focused"]) (false),

    onkeyup: (state: any, { key, target: { value } }: any): any => {
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
      return noopKeys.includes (key) ? state : update (search) (path) (id) (value) (state)
    },

    // Here we're using the non-standard `search` event because it can detect
    // when a searchbox's clear button is used. The `input` event can also
    // detect it but it will also detect keypresses which makes things
    // less convenient since it would conflict with how we're using
    // the `keyup` event.
    // https://stackoverflow.com/a/25569880
    onsearch: (state: any, event: any): any => update (search) (path) (id) (event.target.value) (state),

    ...etc,
    class: {
      disabled,
      locked,
      "uy-input": true,
      [etc.class]: !!etc.class,
    },
  })

  return box ({
    disabled,
    locked,
    "uy-control": true,
    "uy-searchbox": true,
  }) ([
    h (
      "label",
      {
        class: {
          disabled,
          locked,
          "uy-searchbox-label": true,
          focus: data.focused,
          busy: data.searching,
        },
      },
      [
        inputSearch,
        h (
          "span",
          { onclick: update (search) (path) (id) (data.value) },
          [
            icon ({
              fas: true,
              "fa-spinner": data.searching,
              "fa-pulse": data.searching,
              "fa-search": !data.searching,
            }),
          ]
        ),
      ]
    ),

    data.results.length && !disabled
      ? popup ({ locked, disabled, id }) ([
        h (
          "ul",
          { class: "uy-searchbox-results uy-scroller" },
          data.results.map (searchResult (path) (id))
        ),
      ])
      : null,
  ])
}

// searchbox :: SearchboxOptions -> [String] -> State -> VNode
const searchbox = component (rawSearchbox)

export { freshSearchbox, searchbox }
