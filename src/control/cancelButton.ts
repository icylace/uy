import { VDOM, h } from "hyperapp"
import { ComponentOptions } from "../types"
import { box } from "../container/ui"

const cancelButton = ({ disabled, locked, update, ...etc }: ComponentOptions): VDOM => {
  return box ("uy-control uy-cancelButton") ([
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
    }, ["✕"]),
  ])
}

export { cancelButton }
