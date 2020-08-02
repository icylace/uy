import type { VDOM } from "hyperapp"

import { i } from "../utility/html"

const icon = (xr: Record<string, boolean>): VDOM => {
  return i ({ class: { "uy-indicator": true, "uy-icon": true, ...xr } })
}

export { icon }
