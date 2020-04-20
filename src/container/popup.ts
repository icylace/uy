import { h } from "/web_modules/hyperapp.js"

// popup :: PopupOptions -> [VNode] -> VNode
const popup = ({ disabled, id, locked, ...etc }: any): any => (contents: any[]): any => {
  return h("div", {
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
