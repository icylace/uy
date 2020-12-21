import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions<S> = {
  label: Content<S>
  onclick: Action<S, MouseEvent>
  class?: ClassProp
  disabled?: boolean
}

export const button = <S>(options: ButtonOptions<S>): VDOM<S> => {
  const { label, onclick, disabled, ...etc } = options
  return box("uy-control uy-button", [
    html.button({
      type: "button",
      onclick,
      disabled,
      ...etc,
      class: [{ disabled }, etc.class],
    }, label),
  ])
}
