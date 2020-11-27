import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

export type PopupOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  id: string
}

const popup = <S>(options: PopupOptions, contents: Content<S>): VDOM<S> => {
  const { disabled, id, ...etc } = options
  return div({
    id,
    ...etc,
    class: ["uy-popup", { disabled }, etc.class],
  }, contents)
}

export { popup }
