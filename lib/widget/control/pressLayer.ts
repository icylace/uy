import { ClassProp, EventActions, VNode, h } from "hyperapp"

export type { PressLayerOptions }
export { pressLayer }

// -----------------------------------------------------------------------------

type PressLayerOptions<S> = {
  onclick: EventActions<S>["onclick"]
  class?: ClassProp
  disabled?: boolean
}

// An invisible layer which captures click-like events.
const pressLayer = <S>(options: PressLayerOptions<S>): VNode<S> => {
  const { onclick, disabled, ...etc } = options
  return h("div", {
    type: "button",
    onclick,
    disabled,
    ...etc,
    class: ["uy-pressLayer", etc.class, { disabled }],
  })
}
