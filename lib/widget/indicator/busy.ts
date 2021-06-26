import type { ClassProp, VNode } from "hyperapp"

import { h } from "hyperapp"

export type BusyOptions = {
  class?: ClassProp
  disabled?: boolean
}

export const busy = <S>(props: BusyOptions = {}): VNode<S> =>
  h("span", { ...props, class: ["uy-indicator uy-busy", props.class] })
