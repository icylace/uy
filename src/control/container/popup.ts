import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

export type PopupOptions =
  | string
  | {
    [_: string]: unknown
    id: string
    class?: ClassProp
    disabled?: boolean
  }

export const popup = <S>(options: PopupOptions, contents: Content<S>): VDOM<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { id, disabled, ...etc } = props
  return div(
    { id, ...etc, class: ["uy-popup", { disabled }, etc.class] },
    contents
  )
}
