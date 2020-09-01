import type { VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ComponentOptions, Handler } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions = ComponentOptions & {
  label?: Content
  update: Handler
}

export const button = ({ disabled, locked, label, update, ...etc }: ButtonOptions): VDOM =>
  box ("uy-control uy-button") ([
    html.button ({
      disabled,
      type: "button",
      onclick: update,
      ...etc,
      class: cc (["uy-clicky", { locked, disabled }, etc.class]),
    }, label),
  ])
