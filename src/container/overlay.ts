import type { ClassProp, State, VDOM, View } from "hyperapp"

import cc from "classcat"
import { div } from "ntml"
import { box } from "./box"

export type OverlayOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}

const overlay = <S>(options: OverlayOptions, views: View<S>[]) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, ...etc } = options
  return box("uy-overlay-background", [
    div({
      disabled,
      ...etc,
      class: cc(["uy-overlay", { locked, disabled }, etc.class]),
    }, views.map((g) => g(state))),
  ])
}

export { overlay }
