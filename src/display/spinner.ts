import type { VDOM } from "hyperapp"
import type { ComponentOptions } from "../types"

import { h } from "hyperapp"

const spinner = (props: ComponentOptions): VDOM => {
  return h ("span", { class: "uy-indicator uy-spinner", ...props })
}

export { spinner }
