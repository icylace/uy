import type { VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { ComponentOptions, ContainerView } from "../types"

import cc from "classcat"
import { div } from "ntml"
import { box } from "./box"
import { ui } from "./ui"

export type OverlayOptions = ComponentOptions

const rawOverlay = ({ disabled, locked, ...etc }: OverlayOptions) => (contents: Contents): VDOM =>
  box ("uy-overlay-background") ([
    div ({
      disabled,
      ...etc,
      class: cc (["uy-overlay", { locked, disabled }, etc.class]),
    }, contents),
  ])

export const overlay = (props: OverlayOptions): ContainerView =>
  ui (rawOverlay (props))
