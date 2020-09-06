import type { ClassProp, VDOM } from "hyperapp"
import type { Transform } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type CancelButtonOptions<S, P> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Transform<S, P>
}

const cancelButton = <S, P>({ disabled, locked, update, ...etc }: CancelButtonOptions<S, P>): VDOM<S> => {
  return box ("uy-control uy-cancelButton") ([
    html.button ({
      disabled,
      type: "button",
      onclick: update,
      ...etc,
      class: cc (["uy-clicky", { locked, disabled }, etc.class]),
    }, "✕") as VDOM<S>,
  ])
}

export { cancelButton }
