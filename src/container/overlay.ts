import { VDOM, VNode, h } from "hyperapp"
import { ComponentOptions } from "../types"
import { box, ui } from "./ui"

const rawOverlay = ({ disabled, locked, ...etc }: ComponentOptions) => (contents: VNode): VDOM => {
  return box ("uy-overlay-background") ([
    h ("div", {
      disabled,
      ...etc,
      class: {
        disabled,
        locked,
        // TODO:
        // "uy-container": true,
        "uy-overlay": true,
        [etc.class]: !!etc.class,
      },
    }, contents),
  ])
}

// overlay :: ComponentOptions -> [AnyFunction] -> State -> VNode
const overlay = (state: any): any => ui (rawOverlay (state))

export { overlay }
