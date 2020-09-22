import type { Action, ClassProp, VDOM } from "hyperapp"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type CancelButtonOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Action<S, MouseEvent>
}

const cancelButton =
  <S>({ disabled, locked, update, ...etc }: CancelButtonOptions<S>): VDOM<S> =>
    box("uy-control uy-cancelButton", [
      html.button({
        disabled,
        type: "button",
        onclick: update,
        ...etc,
        class: cc(["uy-clicky", { locked, disabled }, etc.class]),
      }, "✕"),
    ])

export { cancelButton }
