import type { VDOM } from "hyperapp"
import type { ComponentOptions, Content } from "../types"

import { div } from "ntml"

export type PopupOptions = ComponentOptions & {
  id: string
}

const popup = ({ disabled, id, locked, ...etc }: PopupOptions) => (content: Content): VDOM =>
  div ({
    id,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-container": true,
      "uy-popup": true,
      // TODO:
      // - handle all class prop variations
      [etc.class as string]: !!etc.class,
    },
  }, content)

export { popup }
