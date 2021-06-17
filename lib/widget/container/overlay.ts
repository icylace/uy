import type { ClassProp, VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { using } from "../../utility/using"

export type OverlayOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
}

export const overlay = <S>(options: OverlayOptions, views: View<S>[]) => {
  return (state: S): VNode<S> => {
    const { disabled, ...etc } = options
    return h("div", { class: "uy-overlay-background" }, [
      h("div", {
        disabled,
        ...etc,
        class: ["uy-overlay", { disabled }, etc.class],
      }, using(views)(state)),
    ])
  }
}
