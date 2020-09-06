import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Transform } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type ButtonOptions<S, P> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  label?: Content<S>
  locked: boolean
  update: Transform<S, P>
}

export const button = <S, P extends MouseEvent>({ disabled, locked, label, update, ...etc }: ButtonOptions<S, P>): VDOM<S> =>
  box ("uy-control uy-button") ([
    html.button ({
      disabled,
      type: "button",
      onclick: update,
      ...etc,
      class: cc (["uy-clicky", { locked, disabled }, etc.class]),
    }, label) as VDOM<S>,
  ])
