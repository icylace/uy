import type { MaybeVNode, VNode } from "hyperapp"

import { text } from "hyperapp"

export type BaseContent<S> = number | string | MaybeVNode<S>
export type Content<S> = BaseContent<S> | readonly BaseContent<S>[]
export type View<S> = (state: S) => MaybeVNode<S>
export type ContentView<S> = Content<S> | View<S>

const render = <S>(x: BaseContent<S>): MaybeVNode<S> =>
  typeof x === "number" || typeof x === "string" ? text(x) : x

export const c = <S>(x: Content<S>): MaybeVNode<S> | readonly MaybeVNode<S>[] =>
  Array.isArray(x)
    ? (x as BaseContent<S>[]).map(render)
    : render(x as BaseContent<S>)

export const isContent = <S>(x: any): x is Content<S> =>
  x == null
  || Array.isArray(x)
  || typeof x === "boolean"
  // TODO:
  // || typeof x === "function"
  || typeof x === "number"
  || typeof x === "string"
  || isVDOM(x)

export const isVDOM = <S>(x: any): x is VNode<S> =>
  typeof x === "object" && "node" in x
