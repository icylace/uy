import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import { div } from "ntml"

export type PopupOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  id: string
  locked: boolean
}

export const popup = <S>(props: PopupOptions, contents: Content<S> | Content<S>[]): VDOM<S> => {
  const { disabled, id, locked, ...etc } = props
  return div({
    id,
    ...etc,
    class: cc([
      "uy-container uy-popup",
      { locked, disabled },
      etc.class,
    ]),
  }, contents)
}
