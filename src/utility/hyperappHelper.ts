import type {
  Action,
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
export const handleValueWith = (f: Handler) => <S>(state: State<S>, event: Event): State<S> =>
  f (state, (event.target as HTMLInputElement).value)

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
