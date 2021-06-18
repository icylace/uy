import type { MaybeVNode, VNode } from "hyperapp"

import { text } from "hyperapp"

export type RawContent<S> = number | string | MaybeVNode<S>
export type Content<S> = RawContent<S> | readonly RawContent<S>[]

export type View<S> = (state: S) => MaybeVNode<S>

export type ContentView<S> = Content<S> | View<S>

const render = <S>(x: RawContent<S>): MaybeVNode<S> | readonly MaybeVNode<S>[] =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

export const c = <S>(x: Content<S>): MaybeVNode<S> | readonly MaybeVNode<S>[] =>
  Array.isArray(x) ? (x as RawContent<S>[]).map(render) : render(x)

export const isContent = <S>(x: any): x is Content<S> =>
  x == null
  || Array.isArray(x)
  || typeof x === "boolean"
  || typeof x === "function"
  || typeof x === "number"
  || typeof x === "string"
  || isVDOM(x)

export const isVDOM = <S>(x: any): x is VNode<S> =>
  typeof x === "object" && "node" in x
