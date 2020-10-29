import type { ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import { span } from "ntml"

export type SpinnerOptions = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}

const spinner = <S>(props?: SpinnerOptions): VDOM<S> => {
  return span({ ...props, class: cc(["uy-indicator uy-spinner", (props ?? {}).class]) })
}

export { spinner }