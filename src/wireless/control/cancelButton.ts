import type { Action, ClassProp, VDOM } from "hyperapp"

import * as html from "ntml"
import { isAction } from "../../utility/isAction"
import { box } from "../../wireless/container/box"

export type CancelButtonOptions<S>
  = Action<S, MouseEvent>
  | {
    class?: ClassProp
    disabled?: boolean
    onclick: Action<S, MouseEvent>
  }

const cancelButton = <S>(options: CancelButtonOptions<S>): VDOM<S> => {
  const props = isAction<S, MouseEvent>(options) ? { onclick: options } : options
  const { disabled, onclick, ...etc } = props
  return box("uy-control uy-cancelButton", [
    html.button({
      type: "button",
      disabled,
      onclick,
      ...etc,
      class: [{ disabled }, etc.class],
    }, "✕"),
  ])
}

export { cancelButton }
