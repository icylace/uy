// TODO:
// - get rid of this

import type { Action, ClassProp, MaybeVNode, VNode } from "hyperapp"

import { h, text } from "hyperapp"
import { isAction } from "../../utility/hyperappHelper/isAction"

export type CancelButtonOptions<S> =
  | Action<S, MouseEvent>
  | {
    onclick: Action<S, MouseEvent>
    label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
    class?: ClassProp
    disabled?: boolean
  }

export const cancelButton = <S>(options: CancelButtonOptions<S>): VNode<S> => {
  const props = isAction<S, MouseEvent>(options) ? { onclick: options } : options
  const { label = text("✕"), onclick, disabled, ...etc } = props
  return h("div", { class: [etc.class ?? "uy-control uy-cancelButton", { disabled }] }, [
    h("button", {
      type: "button",
      onclick,
      disabled,
      ...etc,
    }, label),
  ])
}
