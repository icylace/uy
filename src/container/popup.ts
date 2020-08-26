import type { VDOM } from "hyperapp"
import type { ComponentOptions, Content } from "../types"

import cc from "classcat"
import { div } from "ntml"

export type PopupOptions = ComponentOptions & {
  id: string
}

const popup = ({ disabled, id, locked, ...etc }: PopupOptions) => (content: Content): VDOM =>
  div ({
    id,
    ...etc,
    class: cc ([
      {
        disabled,
        locked,
        "uy-container": true,
        "uy-popup": true,
      },
      etc.class,
    ]),
  }, content)

export { popup }
