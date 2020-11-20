import type { Action, ClassProp, VDOM } from "hyperapp"

import * as html from "ntml"
import { box } from "../container/box"

export type CancelButtonOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  handler: Action<S, MouseEvent>
}

const cancelButton = <S>(options: CancelButtonOptions<S>): VDOM<S> => {
  const { disabled, locked, handler, ...etc } = options
  return box("uy-control uy-cancelButton", [
    html.button({
      disabled,
      type: "button",
      onclick: handler,
      ...etc,
      class: [{ locked, disabled }, etc.class],
    }, "✕"),
  ])
}

export { cancelButton }
