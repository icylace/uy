import type { ClassProp, EventActions, VNode } from "hyperapp"

import { h } from "hyperapp"

export type PressLayerOptions<S> = {
  onclick: EventActions<S>["onclick"]
  class?: ClassProp
  disabled?: boolean
}

// An invisible layer which captures click-like events.
export const pressLayer = <S>(options: PressLayerOptions<S>): VNode<S> => {
  const { onclick, disabled, ...etc } = options
  return h("div", {
    type: "button",
    onclick,
    disabled,
    ...etc,
    class: ["uy-pressLayer", { disabled }, etc.class],
  })
}
