import { ClassProp, EventActions, VNode, h } from "hyperapp"
import type { Content } from "hyperapplicable"

export type { ButtonOptions }
export { button }

// -----------------------------------------------------------------------------

type ButtonOptions<S> = {
  label: Content<S>
  onclick: EventActions<S>["onclick"]
  class?: ClassProp
  disabled?: boolean
}

const button = <S>(options: ButtonOptions<S>): VNode<S> => {
  const { label, disabled, ...etc } = options
  return h("div", { class: ["uwye-control uwye-button", etc.class, { disabled }] }, [
    h("button", { type: "button", disabled, ...etc }, label),
  ])
}
