import type { VDOM } from "hyperapp"
import type { Content, PopupOptions } from "../types"

import { div } from "ntml"

const popup = ({ disabled, id, locked, ...etc }: PopupOptions) => (content: Content): VDOM =>
  div ({
    id,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-container": true,
      "uy-popup": true,
      [etc.class]: !!etc.class,
    },
  }, content)

export { popup }
