import type { Action, ClassProp, VDOM } from "hyperapp"

import * as html from "ntml"
import { box } from "../container/box"

export type CancelButtonOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  onclick: Action<S, MouseEvent>
}

const cancelButton = <S>(options: CancelButtonOptions<S>): VDOM<S> => {
  const { disabled, onclick, ...etc } = options
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
