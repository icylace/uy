import type { VDOM } from "hyperapp"
import type { ControlOptions } from "../types"

import * as html from "ntml"
import { box } from "../container/box"

const cancelButton = ({ disabled, locked, update, ...etc }: ControlOptions): VDOM => {
  return box ("uy-control uy-cancelButton") ([
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
    }, "✕"),
  ])
}

export { cancelButton }
