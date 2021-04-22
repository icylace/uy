import type { ClassProp, VNode } from "hyperapp"

import { div } from "ntml"
import { box } from "./box"

export type OverlayOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
}

export const overlay = <S>(options: OverlayOptions, views: ((state: S) => VNode<S>)[]) => {
  return (state: S): VNode<S> => {
    const { disabled, ...etc } = options
    return box("uy-overlay-background", [
      div(
        { disabled, ...etc, class: ["uy-overlay", { disabled }, etc.class] },
        views.map((g) => g(state))
      ),
    ])
  }
}
