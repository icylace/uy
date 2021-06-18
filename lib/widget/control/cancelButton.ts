// TODO:
// - get rid of this

import type { Action, ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { h, text } from "hyperapp"
import { c } from "../../utility/hyperappHelper/content"
import { isAction } from "../../utility/hyperappHelper/isAction"

export type CancelButtonOptions<S> =
  | Action<S, MouseEvent>
  | {
    onclick: Action<S, MouseEvent>
    label?: Content<S>
    class?: ClassProp
    disabled?: boolean
  }

export const cancelButton = <S>(options: CancelButtonOptions<S>): VNode<S> => {
  const props = isAction<S, MouseEvent>(options) ? { onclick: options } : options
  const { label = text("✕"), onclick, disabled, ...etc } = props
  return h("div", { class: "uy-control uy-cancelButton" }, [
    h("button", {
      type: "button",
      onclick,
      disabled,
      ...etc,
      class: [{ disabled }, etc.class],
    }, c(label)),
  ])
}
