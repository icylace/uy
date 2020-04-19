import { h } from "hyperapp"
import { box } from "../container/ui"
import { action } from "../utility/event"

// button :: ButtonOptions -> VNode
const button = ({ disabled, locked, label, update, ...etc }: any): any =>
  box("uy-control uy-button", [
    h("button", {
      disabled,
      type: "button",
      onclick: action(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-clicky": true,
        [etc.class]: !!etc.class,
      },
    }, [label]),
  ])

export { button }
