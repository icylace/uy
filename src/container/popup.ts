import type { VDOM, VNode } from "hyperapp"
import type { PopupOptions } from "../types"

import { div } from "../utility/html"

const popup = ({ disabled, id, locked, ...etc }: PopupOptions) => (contents: VNode[]): VDOM => {
  return div ({
    id,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-container": true,
      "uy-popup": true,
      [etc.class]: !!etc.class,
    },
  }, contents)
}

export { popup }
