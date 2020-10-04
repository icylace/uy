import type {
  Action,
  Dispatch,
  // Effect,
  EffectDescriptor,
  EffectfulState,
  Payload,
  State,
  Transform,
  Unsubscribe,
} from "hyperapp"

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

// export const toggle = <T>(x: T) => (cond: boolean): T | null => cond ? x : null

// export const toggleBetween = <T>(x: T) =>
//   <U>(y: U) => (cond: boolean): T | U => cond ? x : y

// -----------------------------------------------------------------------------

// Constructs a CSS class string.
export const glam = (xr: { [_: string]: boolean }): string =>
  // TODO:
  // - switch to using a Map object instead in order to guarantee order
  Object.entries(xr)
    .reduce(
      (acc: string[], [cssClass, active]: [string, boolean]): string[] =>
        active ? [...acc, cssClass] : acc,
      [],
    )
    .join(" ")

// -----------------------------------------------------------------------------

// // Based on:
// // https://github.com/jorgebucaran/hyperapp/blob/f30e70e77513948d2a1286ea6509b4e0c1de8999/lib/dom/src/index.js
// export const fx = <S, P>(f: Effect<S, P>) => (x: Payload<P>): EffectDescriptor<S, P> =>
//   [f, x]

// -----------------------------------------------------------------------------

// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484

const windowListener = (name: string) =>
  <S>(dispatch: Dispatch<S>, action?: Action<S, Event>): void | Unsubscribe => {
    if (!action) return
    const listener = (event: Event): void => dispatch(action, event)
    window.addEventListener(name, listener)
    return (): void => window.removeEventListener(name, listener)
  }

const eventFx = (name: string) =>
  <S>(action: Action<S, Event>): EffectDescriptor<S, Action<S, Event>> =>
    [windowListener(name), action]
// fx (windowListener (name)) (action)

export const onMouseDown = eventFx("mousedown")

// -----------------------------------------------------------------------------

// TODO:
// const handleValueWith = <S>(f: (a: State<S>, b: string) => any) => <E>(state: State<S>, event: E): any => {
//   return f (state, event.target.value)
// }

// export const handleValueWith =
//   (f: Transform) =>
//     <S, P extends Event>(state: State<S>, event: Payload<P>): Transition<S, P> => {
//       const target = event.target as HTMLInputElement
//       return f (state, target.value)
//     }

// // A transition is a state transformation with any effects to run.
// type Transition<S> = State<S> | EffectfulState<S>

export const unite = <S, P>(
  t: Transform<S>,
  s: State<S> | EffectfulState<S>,
  p?: Payload<P>
): State<S> | EffectfulState<S> => {
  if (!Array.isArray(s)) {
    return t(s, p)
  }

  const [state, ...effects] = s
  const transition = t(state, p)

  if (!Array.isArray(transition)) {
    return [transition, ...effects]
  }

  const [newState, ...newEffects] = transition
  return [newState, ...effects, ...newEffects]
}

// Invokes a collection of event handlers for the same event.
export const handleUsing = <S>(handlers: Transform<S, Event>[]) => {
  return (state: State<S> | EffectfulState<S>, event?: Payload<Event>): State<S> | EffectfulState<S> => {
    return handlers.reduce((s, t) => unite(t, s, event), state)
  }
}

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
export const onOutside = <S>(selector: string, action: Transform<S, unknown>) => {
  return (state: State<S>, event?: Payload<Event>): State<S> | EffectfulState<S> => {
    if (!event) return state
    const el = document.querySelector(selector)
    if (!el || el.contains(event.target as Element)) return state
    return action(state, event)
  }
}
