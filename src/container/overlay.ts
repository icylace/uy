import { h } from "hyperapp"
import { box, ui } from "./ui"

// @ts-ignore
const { S } = window.sanctuary

// rawOverlay :: ComponentOptions -> [VNode] -> VNode
const rawOverlay = ({ disabled, locked, ...etc }: any) => (contents: any[]): any =>
  box("uy-overlay-background", [
    h("div", {
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

// overlay :: ComponentOptions -> [AnyFunction] -> State -> VNode
const overlay = S.compose(ui)(rawOverlay)

export { overlay }
