import type { VDOM } from "hyperapp"
import type { ComponentOptions, ContainerView, Content } from "../types"

import cc from "classcat"
import { div } from "ntml"
import { box } from "./box"
import { ui } from "./ui"

const rawOverlay = ({ disabled, locked, ...etc }: ComponentOptions) => (content: Content): VDOM =>
  box ("uy-overlay-background") ([
    div ({
      disabled,
      ...etc,
      class: cc ([
        {
          disabled,
          locked,
          // TODO:
          // "uy-container": true,
          "uy-overlay": true,
        },
        etc.class,
      ]),
    }, content),
  ])

const overlay = (props: ComponentOptions): ContainerView =>
  ui (rawOverlay (props))

export { overlay }
