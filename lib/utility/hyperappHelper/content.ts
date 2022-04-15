import type { MaybeVNode, VNode } from "hyperapp"

export type { View, ContentView }
export { isContent, isVNode }

// -----------------------------------------------------------------------------

type View<S> = (state: S) => MaybeVNode<S>
type ContentView<S> = MaybeVNode<S> | View<S>

const isContent = <S>(x: any): x is (MaybeVNode<S> | readonly MaybeVNode<S>[]) =>
  x == null || Array.isArray(x) || typeof x === "boolean" || isVNode(x)

const isVNode = <S>(x: any): x is VNode<S> =>
  typeof x === "object" && "node" in x
