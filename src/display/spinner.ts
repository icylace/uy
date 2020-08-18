import type { VDOM } from "hyperapp"
import type { ComponentOptions } from "../types"

import { span } from "ntml"

const spinner = (props: ComponentOptions): VDOM =>
  span ({ class: "uy-indicator uy-spinner", ...props })

export { spinner }
