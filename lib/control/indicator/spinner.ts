import type { ClassProp, VNode } from "hyperapp"

import { h } from "hyperapp"

export type SpinnerOptions = {
  class?: ClassProp
  disabled?: boolean
}

export const spinner = <S>(props: SpinnerOptions = {}): VNode<S> =>
  h("span", { ...props, class: ["uy-indicator uy-spinner", props.class] })
