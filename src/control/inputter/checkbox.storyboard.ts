import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { checkbox, freshCheckbox, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, checkbox: freshCheckbox(null) })

const checkbox1Normal = checkbox<Story>("CHECK TEST")("checkbox")
const checkbox1Disabled = checkbox<Story>({ label: "CHECK TEST", disabled: true })("checkbox")

const checkbox2Normal = checkbox<Story>({ label: "CHECK TEST" })("checkbox")
const checkbox2Disabled = checkbox<Story>({ label: "CHECK TEST", disabled: true })("checkbox")

// TODO:
// - try out indeterminate state

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(checkbox1Normal),
          toggle("showingDisabled")(checkbox1Disabled),
        ]),
        row([
          toggle("showingNormal")(checkbox2Normal),
          toggle("showingDisabled")(checkbox2Disabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("checkbox"),
      ]),
    ]),
  ])

export { freshState, view }
