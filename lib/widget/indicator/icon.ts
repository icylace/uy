import type { ClassProp, VNode } from "hyperapp"

import { h } from "hyperapp"

export const icon = <S>(classProp: ClassProp): VNode<S> =>
  h("i", { class: ["uy-indicator uy-icon", classProp] })
