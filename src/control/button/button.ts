import type { ClassProp, EventActions, VNode } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions<S> = {
  label: Content<S>
  onclick: EventActions<S>["onclick"]
  class?: ClassProp
  disabled?: boolean
}

export const button = <S>(options: ButtonOptions<S>): VNode<S> => {
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
