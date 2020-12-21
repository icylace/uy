import type { ClassProp, VDOM } from "hyperapp"

import { i } from "ntml"

export const icon = <S>(classProp: ClassProp): VDOM<S> =>
  i({ class: ["uy-indicator uy-icon", classProp] })
