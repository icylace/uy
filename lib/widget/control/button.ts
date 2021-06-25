import type { ClassProp, EventActions, MaybeVNode, VNode } from "hyperapp"

import { h } from "hyperapp"

export type ButtonOptions<S> = {
  label: MaybeVNode<S> | readonly MaybeVNode<S>[]
  onclick: EventActions<S>["onclick"]
  class?: ClassProp
  disabled?: boolean
}

export const button = <S>(options: ButtonOptions<S>): VNode<S> => {
  const { label, onclick, disabled, ...etc } = options
  return h("div", { class: etc.class ?? "uy-control uy-button" }, [
    h("button", { type: "button", onclick, disabled, ...etc }, label),
  ])
}
