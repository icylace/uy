import type { VDOM } from "hyperapp"
import type { ComponentOptions, ContainerView, Content } from "../types"

import { div } from "ntml"
import { box } from "./box"
import { ui } from "./ui"

const rawOverlay = ({ disabled, locked, ...etc }: ComponentOptions) => (content: Content): VDOM =>
  box ("uy-overlay-background") ([
    div ({
      disabled,
      ...etc,
      class: {
        disabled,
        locked,
        // TODO:
        // "uy-container": true,
        "uy-overlay": true,
        // TODO:
        // - handle all class prop variations
        [etc.class as string]: !!etc.class,
      },
    }, content),
  ])

const overlay = (props: ComponentOptions): ContainerView =>
  ui (rawOverlay (props))

export { overlay }
