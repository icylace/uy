import type { ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import { span } from "ntml"

export type SpinnerOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

export const spinner = (props: SpinnerOptions): VDOM =>
  span ({ ...props, class: cc (["uy-indicator uy-spinner", props.class]) })
