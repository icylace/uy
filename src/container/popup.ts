import { h } from "hyperapp"

// popup :: PopupOptions -> [VNode] -> VNode
const popup = ({ disabled, id, locked, ...etc }: any): any => (contents: any[]): any =>
  h("div", {
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

export { popup }
