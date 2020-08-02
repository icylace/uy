import type { VDOM } from "hyperapp"
import type { ComponentOptions } from "../types"

import * as html from "../utility/html"

import { box } from "../container/ui"

const cancelButton = ({ disabled, locked, update, ...etc }: ComponentOptions): VDOM => {
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
