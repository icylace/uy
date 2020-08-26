import type { VDOM } from "hyperapp"
import type { LabelledControlOptions } from "../types"

import * as html from "ntml"
import { box } from "../container/box"

const button = ({ disabled, locked, label, update, ...etc }: LabelledControlOptions): VDOM => {
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
        // TODO:
        // - handle all class prop variations
        [etc.class as string]: !!etc.class,
      },
    }, label),
  ])
}

export { button }
