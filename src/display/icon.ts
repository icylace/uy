import type { ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import { i } from "ntml"

const icon = <S, D>(classProp: ClassProp): VDOM<S, D> =>
  i ({ class: cc (["uy-indicator uy-icon", classProp]) })

export { icon }
