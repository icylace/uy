import type { ClassProp, VDOM } from "hyperapp"
import type { Contents } from "ntml"

import cc from "classcat"
import { div } from "ntml"

export type PopupOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  id: string
  locked: boolean
}

export const popup =
  ({ disabled, id, locked, ...etc }: PopupOptions) =>
    <S>(contents: Contents<S>): VDOM<S> =>
      div ({
        id,
        ...etc,
        class: cc ([
          "uy-container uy-popup",
          { locked, disabled },
          etc.class,
        ]),
      }, contents) as VDOM<S>
