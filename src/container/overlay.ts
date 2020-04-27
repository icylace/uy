import { h } from "hyperapp"
import { compose } from "../utility/utility"
import { box, ui } from "./ui"

// rawOverlay :: ComponentOptions -> [VNode] -> VNode
const rawOverlay = ({ disabled, locked, ...etc }: any) => (contents: any[]): any => {
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
const overlay = compose (ui) (rawOverlay)

export { overlay }
