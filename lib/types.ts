import type { MaybeVNode } from "hyperapp"

export type Content<S> = MaybeVNode<S> | readonly MaybeVNode<S>[]
