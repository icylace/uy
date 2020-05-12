import type { VDOM } from "hyperapp"
import type { ControlOptions } from "../types"

import { h } from "hyperapp"
import { box } from "../container/ui"

const button = ({ disabled, locked, label, update, ...etc }: ControlOptions): VDOM => {
  return box ("uy-control uy-button") ([
    h ("button", {
      disabled,
      type: "button",
      onclick: update,
      ...etc,
      class: {
        disabled,
        locked,
        "uy-clicky": true,
        [etc.class]: !!etc.class,
      },
    }, label),
  ])
}

export { button }
