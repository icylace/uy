import type { VDOM } from "hyperapp"

import { i } from "ntml"

const icon = (xr: Record<string, boolean>): VDOM =>
  i ({ class: { "uy-indicator": true, "uy-icon": true, ...xr } })

export { icon }
