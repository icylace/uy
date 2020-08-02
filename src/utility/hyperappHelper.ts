import type { State, VNode } from "hyperapp"

import { h, text } from "hyperapp"

// -----------------------------------------------------------------------------

const stuff = (x: string | VNode): VNode | VNode[] => {
  return typeof x === "string" ? [text (x)] : x
}

const n = (tag: string) => (...args: any[]): VNode =>
  typeof args[0] === "object" && !("node" in args[0])
    ? h (tag, args[0], stuff (args[1]))
    : h (tag, {}, stuff (args[0]))

export const a = n ("a")
export const abbr = n ("abbr")
export const address = n ("address")
export const area = n ("area")
export const article = n ("article")
export const aside = n ("aside")
export const audio = n ("audio")
export const b = n ("b")
export const bdi = n ("bdi")
export const bdo = n ("bdo")
export const blockquote = n ("blockquote")
export const br = n ("br")
export const button = n ("button")
export const canvas = n ("canvas")
export const caption = n ("caption")
export const cite = n ("cite")
export const code = n ("code")
export const col = n ("col")
export const colgroup = n ("colgroup")
export const data = n ("data")
export const datalist = n ("datalist")
export const dd = n ("dd")
export const del = n ("del")
export const details = n ("details")
export const dfn = n ("dfn")
export const dialog = n ("dialog")
export const div = n ("div")
export const dl = n ("dl")
export const dt = n ("dt")
export const em = n ("em")
export const fieldset = n ("fieldset")
export const figcaption = n ("figcaption")
export const figure = n ("figure")
export const footer = n ("footer")
export const form = n ("form")
export const h1 = n ("h1")
export const h2 = n ("h2")
export const h3 = n ("h3")
export const h4 = n ("h4")
export const h5 = n ("h5")
export const h6 = n ("h6")
export const header = n ("header")
export const hr = n ("hr")
export const i = n ("i")
export const iframe = n ("iframe")
export const img = n ("img")
export const input = n ("input")
export const ins = n ("ins")
export const kbd = n ("kbd")
export const label = n ("label")
export const legend = n ("legend")
export const li = n ("li")
export const main = n ("main")
export const map = n ("map")
export const mark = n ("mark")
export const menuitem = n ("menuitem")
export const meter = n ("meter")
export const nav = n ("nav")
export const object = n ("object")
export const ol = n ("ol")
export const optgroup = n ("optgroup")
export const option = n ("option")
export const output = n ("output")
export const p = n ("p")
export const param = n ("param")
export const picture = n ("picture")
export const pre = n ("pre")
export const progress = n ("progress")
export const q = n ("q")
export const rp = n ("rp")
export const rt = n ("rt")
export const rtc = n ("rtc")
export const ruby = n ("ruby")
export const s = n ("s")
export const samp = n ("samp")
export const section = n ("section")
export const select = n ("select")
export const small = n ("small")
export const source = n ("source")
export const span = n ("span")
export const strong = n ("strong")
export const sub = n ("sub")
export const summary = n ("summary")
export const sup = n ("sup")
export const svg = n ("svg")
export const table = n ("table")
export const tbody = n ("tbody")
export const td = n ("td")
export const textarea = n ("textarea")
export const tfoot = n ("tfoot")
export const th = n ("th")
export const thead = n ("thead")
export const time = n ("time")
export const tr = n ("tr")
export const track = n ("track")
export const ul = n ("ul")
export const video = n ("video")
export const wbr = n ("wbr")

// -----------------------------------------------------------------------------

const content = (x: string | VNode | readonly VNode[]): VNode | readonly VNode[] => {
  return typeof x === "string" ? [text (x)] : x
}

// -----------------------------------------------------------------------------

const toggle = <T>(x: T) => (cond: boolean): T | null => {
  return cond ? x : null
}

const toggleBetween = <T>(x: T) => <U>(y: U) => (cond: boolean): T | U => {
  return cond ? x : y
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
const fx = (f: Function) => <T>(x: T): [Function, any] => {
  return [f, x]
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

// TODO:
// const handleValueWith = <S>(f: (a: State<S>, b: string) => any) => <E>(state: State<S>, event: E): any => {
//   return f (state, event.target.value)
// }
const handleValueWith = (f: Function) => <S>(state: State<S>, event: any): any => {
  return f (state, event.target.value)
}

// Invokes a collection of event handlers for the same event.
const handleUsing = (handlers: Function[]) => <S, E>(state: State<S>, event: E): any => {
  return handlers.reduce ((newState: State<S>, f: Function): any => f (newState, event), state)
}

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
const onOutside = (selector: string) => (action: Function) => <S>(state: State<S>, event: any): any => {
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
  toggle,
  toggleBetween,
}
