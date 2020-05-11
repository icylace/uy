import { VDOM, VNode, h } from "hyperapp"
import { PopupOptions } from "../types"

const popup = ({ disabled, id, locked, ...etc }: PopupOptions) => (contents: VNode): VDOM => {
  return h ("div", {
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
