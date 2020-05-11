import { VNode, h } from "hyperapp"
import { ControlOptions } from "../types"
import { box } from "../container/ui"

const button = ({ disabled, locked, label, update, ...etc }: ControlOptions): VNode => {
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
    }, [label]),
  ])
}

export { button }
