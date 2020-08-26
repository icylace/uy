import type { ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import { i } from "ntml"

const icon = (classProp: ClassProp): VDOM =>
  i ({ class: cc ([{ "uy-indicator": true, "uy-icon": true }, classProp]) })

export { icon }
