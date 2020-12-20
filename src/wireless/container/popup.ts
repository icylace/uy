import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

export type PopupOptions
  = string
  | {
    [_: string]: unknown
    class?: ClassProp
    disabled?: boolean
    id: string
  }

const popup = <S>(options: PopupOptions, contents: Content<S>): VDOM<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { disabled, id, ...etc } = props
  return div(
    { id, ...etc, class: ["uy-popup", { disabled }, etc.class] },
    contents
  )
}

export { popup }
