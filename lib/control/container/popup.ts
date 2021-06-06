import type { ClassProp, VNode } from "hyperapp"
import type { Content } from "ntml"

import { h } from "hyperapp"

export type PopupOptions =
  | string
  | {
    [_: string]: unknown
    id: string
    class?: ClassProp
    disabled?: boolean
  }

export const popup = <S>(options: PopupOptions, contents: Content<S>): VNode<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { id, disabled, ...etc } = props
  return h("div", { id, ...etc, class: ["uy-popup", { disabled }, etc.class] }, contents)
}
