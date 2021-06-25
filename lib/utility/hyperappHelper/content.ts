import type { MaybeVNode, VNode } from "hyperapp"

export type View<S> = (state: S) => MaybeVNode<S>

export const isContent = <S>(x: any): x is (MaybeVNode<S> | readonly MaybeVNode<S>[]) =>
  x == null
  || Array.isArray(x)
  || typeof x === "boolean"
  || isVNode(x)

export const isVNode = <S>(x: any): x is VNode<S> =>
  typeof x === "object" && "node" in x
