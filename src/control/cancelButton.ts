import type { VDOM } from "hyperapp"
import type { ControlOptions } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

const cancelButton = ({ disabled, locked, update, ...etc }: ControlOptions): VDOM => {
  return box ("uy-control uy-cancelButton") ([
    html.button ({
      disabled,
      type: "button",
      onclick: update,
      ...etc,
      class: cc (["uy-clicky", { locked, disabled }, etc.class]),
    }, "✕"),
  ])
}

export { cancelButton }
