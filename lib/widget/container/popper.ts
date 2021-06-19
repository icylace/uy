import type { ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { c } from "../../utility/hyperappHelper/content"

export type PopperOptions =
  | string
  | {
    [_: string]: unknown
    id: string
    class?: ClassProp
    disabled?: boolean
  }

export const popper = <S>(options: PopperOptions, contents: Content<S>): VNode<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { id, disabled, ...etc } = props
  return h("div", {
    id,
    ...etc,
    class: [etc.class ?? "uy-popper", { disabled }],
  }, c(contents))
}
