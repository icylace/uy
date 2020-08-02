import type { VDOM, VNode } from "hyperapp"
import type { ComponentOptions, ContainerView } from "../types"

import { div } from "../utility/html"

import { box, ui } from "./ui"

const rawOverlay = ({ disabled, locked, ...etc }: ComponentOptions) => (contents: VNode[]): VDOM => {
  return box ("uy-overlay-background") ([
    div ({
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

const overlay = (props: ComponentOptions): ContainerView => ui (rawOverlay (props))

export { overlay }
