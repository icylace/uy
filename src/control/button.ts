import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: Content<S>
  onclick: Action<S, MouseEvent>
}

const button = <S>(options: ButtonOptions<S>): VDOM<S> => {
  const { disabled, label, onclick, ...etc } = options
  return box("uy-control uy-button", [
    html.button({
      type: "button",
      disabled,
      onclick,
      ...etc,
      class: [{ disabled }, etc.class],
    }, label),
  ])
}

export { button }
