import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

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
      class: [{ locked, disabled }, etc.class],
    }, label),
  ])
}

export { button }
