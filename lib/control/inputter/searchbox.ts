import type { Focus } from "eyepiece"
import type { Action, ClassProp, Effect, MaybeVNode, VNode } from "hyperapp"
import type { StateWithEffects } from "../../utility/hyperappHelper/types"

import { get, set } from "eyepiece"
import { h, text } from "hyperapp"
import { Defocus, Refocus } from "../action/helper"
import { popup } from "../container/popup"
import { icon } from "../indicator/icon"

export type SearchboxValue = string

export type SearchboxData = {
  value: SearchboxValue
  results: string[]
  searching: boolean
  focused?: boolean
}

export type SearchEffectData<S> = {
  action: Action<S, SearchboxData>
  value: SearchboxValue
}

export type SearchboxOptions<S> = {
  id: string
  search: (action: Action<S, SearchboxData>, value: SearchboxValue) => Effect<S, SearchEffectData<S>>
  onresults: (results: SearchboxData["results"], id: string, state: S) => S
  class?: ClassProp
  disabled?: boolean
}

const freshSearchbox = (value: SearchboxValue): SearchboxData => ({
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
  return (state: S): VNode<S> => {
    const { search, onresults, id, disabled, ...etc } = options

    const x = get<SearchboxData>(focus)(state)

    const updateResults = (state: S, props?: SearchboxData): StateWithEffects<S> => {
      const r = get<SearchboxData>(focus)(state)

      const { value, results } = props ?? { value: "", results: [] }

      // It is possible the current value of the searchbox and the value that was
      // actually searched on could be out of sync if the user continues changing
      // the searchbox value during the search. In that case another search gets
      // triggered using the new current searchbox value.

      if (r.value !== value) {
        return [
          set<S>(focus, "searching")(true)(state),
          search(updateResults, r.value),
        ]
      }

      return [
        onresults(results, id, set<S>(focus)(
          (xr: SearchboxData) => ({ ...xr, results, searching: false })
        )(state)),
      ]
    }

    const update = (value: string) => (state: S): StateWithEffects<S> => {
      const r = get<SearchboxData>(focus)(state)
      return r.searching
        ? [set<S>(focus, "value")(value)(state)]
        : [
            set<S>(focus)(
              (xr: SearchboxData) => ({ ...xr, value, searching: true })
            )(state),
            search(updateResults, value),
          ]
    }

    const inputSearch = h("input", {
      value: x.value,
      type: "search",
      disabled,
      onblur: Defocus(focus),
      onfocus: Refocus<S>(focus),
      onkeyup: (state, event) => {
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
        const target = event.target as HTMLInputElement
        return update(target.value)(state)
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    })

    const searchResult = (result: string): VNode<S> =>
      h("li", {
        onclick: (state: S): S =>
          onresults([], id,
            set<S>(focus)(
              (xr: SearchboxData) => ({ ...xr, value: result, results: [] })
            )(state)
          ),
      }, text(result))

    const popupNode = (
      x.results.length && !disabled
        ? popup({ disabled, id }, [
            h("ul", { class: "uy-searchbox-results uy-scroller" }, x.results.map(searchResult)),
          ])
        : null
    ) as MaybeVNode<S>

    return h("div", { class: ["uy-control uy-searchbox", { disabled }] }, [
      h("label", {
        class: {
          "uy-searchbox-label": true,
          focus: x.focused,
          busy: x.searching,
          disabled,
        },
      }, [
        inputSearch,
        h("span", { onclick: update(x.value) }, [
          icon({
            fas: true,
            "fa-spinner": x.searching,
            "fa-pulse": x.searching,
            "fa-search": !x.searching,
          }),
        ]),
      ]),
      popupNode,
    ])
  }
}

export { freshSearchbox, searchbox }
