import { h } from "hyperapp"
import { box } from "../container/ui"

// cancelButton :: ButtonOptions -> VNode
const cancelButton = ({ disabled, locked, update, ...etc }: any): any =>
  box("uy-control uy-cancelButton")([
    h("button", {
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

export { cancelButton }
