import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: Content<S>
  locked?: boolean
  handler: Action<S, MouseEvent>
}

const button = <S>(options: ButtonOptions<S>): VDOM<S> => {
  const { disabled, locked, label, handler, ...etc } = options
  return box("uy-control uy-button", [
    html.button({
      disabled,
      type: "button",
      onclick: handler,
      ...etc,
      class: cc([{ locked, disabled }, etc.class]),
    }, label),
  ])
}

export { button }
