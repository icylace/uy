import type { VDOM } from "hyperapp"

import { h } from "hyperapp"

const icon = (xr: Record<string, boolean>): VDOM => {
  return h ("i", { class: { "uy-indicator": true, "uy-icon": true, ...xr } })
}

export { icon }
