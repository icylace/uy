import type { VDOM } from "hyperapp"
import type { ControlOptions } from "../types"

import * as html from "../utility/html"
import { box } from "../container/ui"

const button = ({ disabled, locked, label, update, ...etc }: ControlOptions): VDOM => {
  return box ("uy-control uy-button") ([
    html.button ({
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
