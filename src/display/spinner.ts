import type { VDOM } from "hyperapp"
import type { ComponentOptions } from "../types"

import cc from "classcat"
import { span } from "ntml"

const spinner = (props: ComponentOptions): VDOM =>
  span ({ ...props, class: cc (["uy-indicator uy-spinner", props.class]) })

export { spinner }
