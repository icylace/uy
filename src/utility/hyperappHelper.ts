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

export const toggle = <T>(x: T) => (cond: boolean): T | null => cond ? x : null

export const toggleBetween = <T>(x: T) =>
  <U>(y: U) => (cond: boolean): T | U => cond ? x : y

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

// export const actWith = <S, P>(a: Action<S, P>) =>
//   (t: Transition<S>): Transition<S> => {
//     let action: Transform<S, P>
//     let payload: Payload<P> | undefined
//     let transition: Transition<S>

//     if (Array.isArray (a)) {
//       action = a[0] as Transform<S, P>
//       payload = a[1]
//       transition = actWith (a[0]) (t)
//       return transition
//     } else {
//       action = a as Transform<S, P>
//       payload = undefined
//       transition = t
//     }

//     if (Array.isArray (t)) {
//       const [state, ...effects] = t
//       const transition = action (state, payload)
//       if (Array.isArray (transition)) {
//         const [restate, ...newEffects] = transition
//         return [restate, ...effects, ...newEffects]
//       }
//       return [transition, ...effects]
//     }

//     return action (t, payload)
//   }

// A transition is a state transformation with any effects to run.
type Transition<S> = State<S> | EffectfulState<S>

// TODO:
export const actWith = <S, P>(a: Action<S, P>) => (t: Transition<S>): Transition<S> => {
  if (!Array.isArray(a)) {
    const action: Action<S, P> = a
    if (!Array.isArray(t)) {
      return action(t) as Transition<S>
    }
    const [state, ...effects]: EffectfulState<S> = t
    const transition: Transition<S> = action(state) as Transition<S>
    if (!Array.isArray(transition)) {
      return [transition, ...effects]
    }
    const [restate, ...newEffects] = transition
    return [restate, ...effects, ...newEffects]
  } else {
    // TODO:
    // const action: Action<S, P> = a[0] as Transform<S, P>
    const action: Transform<S, P> = a[0] as Transform<S, P>
    const payload: Payload<P> = a[1]
    const nextTransition = actWith(a[0])(t)
    if (!Array.isArray(nextTransition)) {
      return action(nextTransition, payload) as Transition<S>
    }
    const [state, ...effects]: EffectfulState<S> = nextTransition
    const transition: Transition<S> = action(state, payload) as Transition<S>
    if (!Array.isArray(transition)) {
      return [transition, ...effects]
    }
    const [restate, ...newEffects] = transition
    return [restate, ...effects, ...newEffects]
  }
}

// Invokes a collection of event handlers for the same event.
export const handleUsing =
  <S>(handlers: Action<S, Event>[]) =>
    (state: Transition<S>, event?: Payload<Event>): Transition<S> =>
      handlers.reduce((t, a) => {
        if (Array.isArray(a)) {
          // TODO:
          // - reconsider discarding original payload?
          return actWith([a[0] as Action<S, unknown>, event])(t)
        }
        return actWith([a as Action<S, unknown>, event])(t)
      }, state)

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
export const onOutside =
  (selector: string) =>
    <S>(action: Transform<S, unknown>) =>
      (state: State<S>, event?: Payload<Event>): Transition<S> => {
        if (!event) return state
        const el = document.querySelector(selector)
        if (!el || el.contains(event.target as Element)) return state
        return action(state, event)
      }
