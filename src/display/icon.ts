import type { ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import { i } from "ntml"

export const icon = <S>(classProp: ClassProp): VDOM<S> => {
  return i({ class: cc(["uy-indicator uy-icon", classProp]) })
}
