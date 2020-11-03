// TODO:

const foo = undefined

export { foo }

// import type {
//   Action,
//   ClassProp,
//   EffectDescriptor,
//   EffectfulState,
//   Payload,
//   State,
//   VDOM,
//   VNode,
// } from "hyperapp"
// import type { Wiring } from "../component"

// import cc from "classcat"
// import { input, label, li, span, ul } from "ntml"
// import { addInsideEl, removeInsideEl } from "../utility/uyHelper"
// import { popup } from "../container/popup"
// import { box } from "../container/box"
// import { icon } from "../indicator/icon"

// export type Searcher<S> = (action: Action<S, SearchboxData>) => (value: string) => EffectDescriptor<S, string>

// export type SearchboxData = {
//   focused: boolean
//   results: string[]
//   searching: boolean
//   value: string
// }

// export type SearchboxOptions<S> = {
//   class?: ClassProp
//   disabled?: boolean
//   locked?: boolean
//   search: Searcher<S>
//   wiring: Wiring<S, SearchboxData>
// }

// const freshSearchbox = (value: string): SearchboxData => ({
//   value,
//   focused: false,
//   searching: false,
//   results: [],
// })

// // -----------------------------------------------------------------------------

// const updateResults = <S>(wiring: Wiring<S, SearchboxData>, search: Searcher<S>, id: string) => {
//   return (state: State<S>, props?: Payload<SearchboxData>): State<S> | EffectfulState<S> => {
//     const r = wiring.get(state)

//     const { value, results } = props ?? { value: "", results: [] }

//     // It is possible the current value of the searchbox and the value that was
//     // actually searched on could be out of sync if the user continues changing
//     // the searchbox value during the search. In that case another search gets
//     // triggered using the new current searchbox value.

//     if (r.value !== value) {
//       return [
//         wiring.set(state, { ...r, searching: true }),
//         search(updateResults(wiring, search, id))(r.value),
//       ]
//     }

//     return results.length
//       ? addInsideEl(id, wiring.set(state, {
//         ...r,
//         results: [],
//         searching: false,
//       }))
//       : removeInsideEl(id, wiring.set(state, {
//         ...r,
//         results,
//         searching: false,
//       }))
//   }
// }

// const update = <S>(wiring: Wiring<S, SearchboxData>, search: Searcher<S>, id: string, value: string) => {
//   return (state: State<S>): State<S> | EffectfulState<S> => {
//     const r = wiring.get(state)
//     return r.searching
//       ? wiring.set(state, { ...r, value })
//       : [
//         wiring.set(state, { ...r, value, searching: true }),
//         search(updateResults(wiring, search, id))(value),
//       ]
//   }
// }

// // -----------------------------------------------------------------------------

// const searchResult = <S>(wiring: Wiring<S, SearchboxData>, id: string) => (x: string): VDOM<S> => {
//   return li<S>({
//     onclick: (state: State<S>): State<S> => {
//       return wiring.set(removeInsideEl(id, state), {
//         ...wiring.get(state),
//         x,
//         results: [],
//       })
//     },
//   }, x)
// }

// // We don't let certain keys unnecessarily affect searching.
// const noopKeys = [
//   "Alt",
//   "ArrowLeft",
//   "ArrowRight",
//   "CapsLock",
//   "Control",
//   "End",
//   "Home",
//   "Hyper",
//   "Meta",
//   "NumLock",
//   "ScrollLock",
//   "Shift",
//   "Super",
// ]

// const searchbox = <S>(options: SearchboxOptions<S>) => (state: State<S>): VDOM<S> => {
//   const { disabled, locked, search, wiring, ...etc } = options
//   const id = path.join("-")
//   const x = wiring.get(state)

//   const inputSearch = input<S>({
//     disabled,
//     readonly: locked,
//     value: x.value,
//     type: "search",
//     onfocus: (state) => wiring.set(state, { ...x, focused: true }),
//     onblur: (state) => wiring.set(state, { ...x, focused: false }),
//     onkeyup: (state, event) => {
//       if (!event) return state
//       if (noopKeys.includes(event.key)) return state
//       const target = event.target as HTMLInputElement
//       return update(wiring, search, id, target.value)(state)
//     },
//     // Here we're using the non-standard `search` event because it can detect
//     // when a searchbox's clear button is used. The `input` event can also
//     // detect it but it will also detect keypresses which makes things
//     // less convenient since it would conflict with how we're using
//     // the `keyup` event.
//     // https://stackoverflow.com/a/25569880
//     onsearch: (state, event) => {
//       if (!event) return state
//       const target = event.target as HTMLInputElement
//       return update(wiring, search, id, target.value)(state)
//     },
//     ...etc,
//     class: cc(["uy-input", { locked, disabled }, etc.class]),
//   })

//   const popupNode = (
//     x.results.length && !disabled
//       ? popup(
//         { locked, disabled, id },
//         [
//           ul(
//             { class: "uy-searchbox-results uy-scroller" },
//             x.results.map(searchResult(wiring, id)),
//           ),
//         ]
//       )
//       : null
//   ) as VNode<S>

//   return box({
//     disabled,
//     locked,
//     "uy-control": true,
//     "uy-searchbox": true,
//   }, [
//     label({
//       class: {
//         "uy-searchbox-label": true,
//         focus: x.focused,
//         busy: x.searching,
//         locked,
//         disabled,
//       },
//     }, [
//       inputSearch,
//       span(
//         { onclick: update(wiring, search, id, x.value) },
//         [
//           icon({
//             fas: true,
//             "fa-spinner": x.searching,
//             "fa-pulse": x.searching,
//             "fa-search": !x.searching,
//           }),
//         ],
//       ),
//     ]),
//     popupNode,
//   ])
// }

// export { freshSearchbox, searchbox }
