import type {
  Action,
  Dispatch,
  Effect,
  EffectData,
  EffectDescriptor,
  State,
  Unsubscribe,
} from "hyperapp"

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
      (acc: string[], [cssClass, active]: [string, boolean]): string[] => {
        return active ? [...acc, cssClass] : acc
      },
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

const windowListener = (name: string) => <S, P, D>(dispatch: Dispatch, action: Action<S, P, D>): Unsubscribe => {
  const listener = (event: Event): void => dispatch (action, event)
  window.addEventListener (name, listener)
  return (): void => window.removeEventListener (name, listener)
}

const eventFx = (name: string) => <S, P, D>(action: Action<S, P, D>): EffectDescriptor<D> =>
  fx (windowListener (name)) (action)

export const onMouseDown = eventFx ("mousedown")

// -----------------------------------------------------------------------------

// TODO:
// const handleValueWith = <S>(f: (a: State<S>, b: string) => any) => <E>(state: State<S>, event: E): any => {
//   return f (state, event.target.value)
// }
export const handleValueWith = (f: Function) => <S>(state: State<S>, event: any): any =>
  f (state, event.target.value)

// Invokes a collection of event handlers for the same event.
export const handleUsing = (handlers: Function[]) => <S, E>(state: State<S>, event: E): any =>
  handlers.reduce (
    (newState: State<S>, f: Function): any => f (newState, event),
    state,
  )

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
export const onOutside = (selector: string) => <S, P, D>(action: Action<S, P, D>) => <S>(state: State<S>, event: any): any => {
  const el = document.querySelector (selector)
  if (!el || el.contains (event.target)) return state
  return action (state, event)
}
