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
        // TODO:
        // - handle all class prop variations
        [etc.class as string]: !!etc.class,
      },
    }, "✕"),
  ])
}

export { cancelButton }
