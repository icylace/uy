import type { VDOM } from "hyperapp"
import type { ComponentOptions, ContainerView, Content } from "../types"

import { div } from "ntml"
import { box, ui } from "./ui"

const rawOverlay = ({ disabled, locked, ...etc }: ComponentOptions) =>
  (content: Content): VDOM => {
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
      }, content),
    ])
  }

const overlay = (props: ComponentOptions): ContainerView =>
  ui (rawOverlay (props))

export { overlay }
