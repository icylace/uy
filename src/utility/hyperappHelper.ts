import type {
  Action,
  // ClassProp,
  Dispatch,
  Effect,
  EffectData,
  EffectDescriptor,
  State,
  Transition,
  Unsubscribe,
} from "hyperapp"

import type { Handler } from "../types"

// -----------------------------------------------------------------------------

// // The `class` property for Hyperapp virtual DOM elements can take multiple
// // forms. This function is able to merge two such values using the form
// // of the initial value if possible.
// export const mergeClasses = (a: ClassProp, b: ClassProp): ClassProp => {
//   if (typeof a === "boolean") {
//     return b
//   }

//   if (typeof a === "string") {
//     if (typeof b === "boolean") {
//       return a
//     }
//     if (typeof b === "string") {
//       return b ? a + " " + b : a
//     }
//     if (Array.isArray (b)) {
//       return [a, ...b].join (" ")
//     }
//     if (typeof b === "object") {
//       return Object.entries (b).reduce ((xs, [k, v]) => v ? [...xs, k] : xs, [a]).join (" ")
//     }
//   }

//   if (Array.isArray (a)) {
//     if (typeof b === "boolean" || typeof b === "string") {
//       return [...a, b]
//     }
//     if (Array.isArray (b)) {
//       return [...a, ...b]
//     }
//     if (typeof b === "object") {
//       return Object.entries (b).reduce ((xs, [k, v]) => v ? [...xs, k] : xs, a)
//     }
//   }

//   if (typeof a === "object") {
//     if (typeof b === "boolean") {
//       return a
//     }
//     if (typeof b === "string") {
//       return { ...a, b: true }
//     }
//     if (Array.isArray (b)) {
//       return b.reduce (
//         (r: ClassProp, x: ClassProp): ClassProp =>
//           x ? { ...r as Record<string, boolean>, [x as string]: true } : r,
//         a,
//       )
//     }
//     if (typeof b === "object") {
//       return { ...a, ...b }
//     }
//   }

//   return a
// }

/*

// Example usage:

const haze = true
const foggy = false

console.log(mergeClasses("hello", "world"))
// "hello world"

console.log(mergeClasses("hello", { mars: false, world: true }))
// "hello world"

console.log(mergeClasses(["purple", haze && "haze"], "violet"))
// ["purple", "haze", "violet"]

console.log(mergeClasses({ common: true, active: false }, ["purple", haze && "haze", foggy && "foggy"]))
// { common: true, active: false, purple: true, haze: true }

console.log(mergeClasses(["purple", haze && "haze", foggy && "foggy"], { common: true, active: false }))
// ["purple", "haze", false, "common"]

*/

// -----------------------------------------------------------------------------

export const toggle = <T>(x: T) => (cond: boolean): T | null =>
  cond ? x : null

export const toggleBetween = <T>(x: T) => <U>(y: U) => (cond: boolean): T | U =>
  cond ? x : y

// -----------------------------------------------------------------------------

// Constructs a CSS class string.
export const glam = (xr: { [_: string]: boolean }): string =>
  // TODO:
  // - switch to using a Map object instead in order to guarantee order
  Object.entries (xr)
    .reduce (
      (acc: string[], [cssClass, active]: [string, boolean]): string[] =>
        active ? [...acc, cssClass] : acc,
      [],
    )
    .join (" ")

// -----------------------------------------------------------------------------

// Based on:
// https://github.com/jorgebucaran/hyperapp/blob/f30e70e77513948d2a1286ea6509b4e0c1de8999/lib/dom/src/index.js
export const fx = (f: Effect) => <D>(x: EffectData<D>): EffectDescriptor<D> =>
  [f, x]

// -----------------------------------------------------------------------------

// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484

type FxListenerData<S, P, D> = { action: Action<S, P, D> }

const windowListener = (name: string) => <S, D>(dispatch: Dispatch, { action }: FxListenerData<S, Event, D>): Unsubscribe => {
  const listener = (event: Event): void => dispatch (action, event)
  window.addEventListener (name, listener)
  return (): void => window.removeEventListener (name, listener)
}

const eventFx = (name: string) => <S, P, D>(action: Action<S, P, D>): EffectDescriptor<FxListenerData<S, P, D>> =>
  fx (windowListener (name) as Effect) ({ action })

export const onMouseDown = eventFx ("mousedown")

// -----------------------------------------------------------------------------

// TODO:
// const handleValueWith = <S>(f: (a: State<S>, b: string) => any) => <E>(state: State<S>, event: E): any => {
//   return f (state, event.target.value)
// }
export const handleValueWith = (f: Handler) => <S>(state: State<S>, event: Event): State<S> => {
  const target = event.target as HTMLInputElement
  return f (state, target.value)
}

// Invokes a collection of event handlers for the same event.
export const handleUsing = (handlers: Handler[]) => <S>(state: State<S>, event: Event): State<S> =>
  handlers.reduce (
    (newState: State<S>, handler: Handler): State<S> => handler (newState, event),
    state,
  )

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
// TODO:
export const onOutside = (selector: string) => <S, P, D>(action: Action<S, P, D>) => (state: State<S>, event: Event): Transition<S, P, D> => {
  const el = document.querySelector (selector)
  if (!el || el.contains (event.target as Node)) return state
  return action (state, event)
}
