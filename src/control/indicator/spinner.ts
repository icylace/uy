import type { ClassProp, VDOM } from "hyperapp"

import { span } from "ntml"

export type SpinnerOptions = {
  class?: ClassProp
  disabled?: boolean
}

export const spinner = <S>(props: SpinnerOptions = {}): VDOM<S> =>
  span({ ...props, class: ["uy-indicator uy-spinner", props.class] })
