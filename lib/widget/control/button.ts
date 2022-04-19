import { ClassProp, EventActions, MaybeVNode, VNode, h } from "hyperapp"

export type { ButtonOptions }
export { button }

// -----------------------------------------------------------------------------

type ButtonOptions<S> = {
  label: MaybeVNode<S> | readonly MaybeVNode<S>[]
  onclick: EventActions<S>["onclick"]
  class?: ClassProp
  disabled?: boolean
}

const button = <S>(options: ButtonOptions<S>): VNode<S> => {
  const { label, disabled, ...etc } = options
  return h("div", { class: ["uy-control uy-button", etc.class, { disabled }] }, [
    h("button", { type: "button", disabled, ...etc }, label),
  ])
}
