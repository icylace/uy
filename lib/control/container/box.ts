import type { ClassProp, MaybeVNode, VNode } from "hyperapp"

import { h } from "hyperapp"

export const box = <S>(classes: ClassProp, contents: MaybeVNode<S> | readonly MaybeVNode<S>[]): VNode<S> =>
  h("div", { class: classes }, contents)
