import type { MaybeVNode, VNode } from "hyperapp"

import { text } from "hyperapp"

export type Content<S> =
  | number
  | string
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]

export type View<S> = (state: S) => MaybeVNode<S>

export const c = <S>(x: Content<S>): MaybeVNode<S> | readonly MaybeVNode<S>[] =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

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
