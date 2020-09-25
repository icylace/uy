import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions<S> = {
  class?: ClassProp
  disabled: boolean
  label?: Content<S>
  locked: boolean
  update: Action<S, MouseEvent>
}

export const button = <S>(props: ButtonOptions<S>): VDOM<S> => {
  const { disabled, locked, label, update, ...etc } = props
  return box("uy-control uy-button", [
    html.button({
      disabled,
      type: "button",
      onclick: update,
      ...etc,
      class: cc(["uy-clicky", { locked, disabled }, etc.class]),
    }, label),
  ])
}
