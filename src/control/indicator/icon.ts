import type { ClassProp, VNode } from "hyperapp"

import { i } from "ntml"

export const icon = <S>(classProp: ClassProp): VNode<S> =>
  i({ class: ["uy-indicator uy-icon", classProp] })
