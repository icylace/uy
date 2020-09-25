import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import { div } from "ntml"
import { box } from "./box"

export type OverlayOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

const rawOverlay = <S>(props: OverlayOptions, contents: Content<S> | Content<S>[]): VDOM<S> => {
  const { disabled, locked, ...etc } = props
  return box("uy-overlay-background", [
    div({
      disabled,
      ...etc,
      class: cc(["uy-overlay", { locked, disabled }, etc.class]),
    }, contents),
  ])
}

export const overlay =
  <S>(props: OverlayOptions, views: View<S>[]) =>
    (state: State<S>): VDOM<S> =>
      rawOverlay(props, views.map((g) => g(state)))
