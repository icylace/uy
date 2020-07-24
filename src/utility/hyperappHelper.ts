import type { VNode } from "hyperapp"

import { text } from "hyperapp"

const content = (x: string | VNode | readonly VNode[]): VNode | readonly VNode[] => {
  return typeof x === "string" ? [text (x)] : x
}

// -----------------------------------------------------------------------------

// Constructs a CSS class string.
const glam = (xr: { [k: string]: boolean }): string => {
  // TODO:
  // - switch to using a Map object instead in order to guarantee order
  return Object.entries (xr)
    .reduce ((acc: string[], [cssClass, active]: [string, boolean]): string[] => {
      return active ? [...acc, cssClass] : acc
    }, [])
    .join (" ")
}

// -----------------------------------------------------------------------------

// https://github.com/jorgebucaran/hyperapp/blob/f30e70e77513948d2a1286ea6509b4e0c1de8999/lib/dom/src/index.js
const fx = (a: Function) => (b: any): [Function, any] => {
  return [a, b]
}

// -----------------------------------------------------------------------------

// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484

const windowListener = (name: string) => (dispatch: any, action: any): Function => {
  const listener = (event: any): any => dispatch (action, event)
  window.addEventListener (name, listener)
  return (): void => window.removeEventListener (name, listener)
}

const eventFx = (name: string) => (action: any): any[] => {
  return fx (windowListener (name)) (action)
}

const onMouseDown = eventFx ("mousedown")

// -----------------------------------------------------------------------------

const handleValueWith = (f: Function) => (state: any, event: any): any => {
  return f (state, event.target.value)
}

// Invokes a collection of event handlers for the same event.
const handleUsing = (handlers: any[]) => (state: any, event: any): any => {
  return handlers.reduce ((newState: any, f: Function): any => f (newState, event), state)
}

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
const onOutside = (selector: string) => (action: Function) => (state: any, event: any): any => {
  const el = document.querySelector (selector)
  if (!el || el.contains (event.target)) return state
  return action (state, event)
}

// -----------------------------------------------------------------------------

export {
  content,
  fx,
  glam,
  handleUsing,
  handleValueWith,
  onMouseDown,
  onOutside,
}
