import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { freshNumberbox, numberbox, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, numberbox: freshNumberbox(0) })

const numberbox1Normal = numberbox<Story>("UNIT")("numberbox")
const numberbox2Normal = numberbox<Story>({ label: "UNIT" })("numberbox")
const numberboxDisabled = numberbox<Story>({ label: "UNIT", disabled: true })("numberbox")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(numberbox1Normal),
          toggle("showingNormal")(numberbox2Normal),
          toggle("showingDisabled")(numberboxDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("numberbox"),
      ]),
    ]),
  ])

export { freshState, view }
