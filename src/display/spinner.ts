import type { VDOM } from "hyperapp"
import type { ComponentOptions } from "../types"

import { span } from "../utility/html"

const spinner = (props: ComponentOptions): VDOM => {
  return span ({ class: "uy-indicator uy-spinner", ...props })
}

export { spinner }
