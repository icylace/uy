import type { Action, ClassProp, VNode } from "hyperapp"
import type { Content } from "../../types"

import { h } from "hyperapp"
import { isAction } from "../../utility/uyHelper/isAction"
import { box } from "../container/box"

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
  const { label = "✕", onclick, disabled, ...etc } = props
  return box("uy-control uy-cancelButton", [
    h("button", {
      type: "button",
      onclick,
      disabled,
      ...etc,
      class: [{ disabled }, etc.class],
    }, label),
  ])
}
