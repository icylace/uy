import type { ClassProp, VNode } from "hyperapp"
import type { Content } from "../../types"

import { h } from "hyperapp"

export const box = <S>(classes: ClassProp, contents: Content<S>): VNode<S> =>
  h("div", { class: classes }, contents)
