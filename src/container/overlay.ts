import type { ClassProp, VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { ContainerView } from "../types"

import cc from "classcat"
import { div } from "ntml"
import { box } from "./box"
import { ui } from "./ui"

export type OverlayOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

const rawOverlay =
  ({ disabled, locked, ...etc }: OverlayOptions) =>
    <S>(contents: Contents<S>): VDOM<S> =>
      box ("uy-overlay-background") ([
        div ({
          disabled,
          ...etc,
          class: cc (["uy-overlay", { locked, disabled }, etc.class]),
        }, contents),
      ])

export const overlay = <S>(props: OverlayOptions): ContainerView<S> =>
  ui (rawOverlay (props))
