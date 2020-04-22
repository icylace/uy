import { h } from "hyperapp"

// icon :: Object -> VNode
const icon = (xr: any): any => {
  return h("i", { class: { "uy-indicator": true, "uy-icon": true, ...xr } })
}

export { icon }
