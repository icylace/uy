import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import { div } from "ntml"

export type PopupOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  id: string
  locked?: boolean
}

const popup = <S>(options: PopupOptions, contents: Content<S> | Content<S>[]): VDOM<S> => {
  const { disabled, id, locked, ...etc } = options
  return div({
    id,
    ...etc,
    class: cc(["uy-popup", { locked, disabled }, etc.class]),
  }, contents)
}

export { popup }
