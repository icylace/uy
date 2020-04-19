import { h } from "hyperapp"

// icon :: Object -> VNode
const icon = (xr: object): any => h("i", { class: { "uy-indicator": true, "uy-icon": true, ...xr } })

export { icon }
