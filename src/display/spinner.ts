import type { ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import { span } from "ntml"

export type SpinnerOptions = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

export const spinner = <S>(props: SpinnerOptions): VDOM<S> =>
  span({ ...props, class: cc(["uy-indicator uy-spinner", props.class]) })
