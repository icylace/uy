import { VDOM, h } from "hyperapp"
import { ComponentOptions } from "../types"

const spinner = (props: ComponentOptions): VDOM => {
  return h ("span", { class: "uy-indicator uy-spinner", ...props })
}

export { spinner }
