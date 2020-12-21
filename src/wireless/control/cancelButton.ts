import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"
import { isAction } from "../../utility/isAction"
import { box } from "../../wireless/container/box"

export type CancelButtonOptions<S>
  = Action<S, MouseEvent>
  | {
    onclick: Action<S, MouseEvent>
    label?: Content<S>
    class?: ClassProp
    disabled?: boolean
  }

export const cancelButton = <S>(options: CancelButtonOptions<S>): VDOM<S> => {
  const props = isAction<S, MouseEvent>(options) ? { onclick: options } : options
  const { disabled, onclick, label = "✕", ...etc } = props
  return box("uy-control uy-cancelButton", [
    html.button({
      type: "button",
      disabled,
      onclick,
      ...etc,
      class: [{ disabled }, etc.class],
    }, label),
  ])
}
