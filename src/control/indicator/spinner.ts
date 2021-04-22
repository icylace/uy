import type { ClassProp, VNode } from "hyperapp"

import { span } from "ntml"

export type SpinnerOptions = {
  class?: ClassProp
  disabled?: boolean
}

export const spinner = <S>(props: SpinnerOptions = {}): VNode<S> =>
  span({ ...props, class: ["uy-indicator uy-spinner", props.class] })
