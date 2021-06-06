import type { Story } from "../../types"

import { checkbox, freshCheckbox, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, checkbox: freshCheckbox(null) })

const checkbox1Normal = checkbox("CHECK TEST")("checkbox")
const checkbox1Disabled = checkbox({ label: "CHECK TEST", disabled: true })("checkbox")

const checkbox2Normal = checkbox({ label: "CHECK TEST" })("checkbox")
const checkbox2Disabled = checkbox({ label: "CHECK TEST", disabled: true })("checkbox")

// TODO:
// - try out indeterminate state

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(checkbox1Normal),
      toggle("showingDisabled")(checkbox1Disabled),
    ]),
    row([
      toggle("showingNormal")(checkbox2Normal),
      toggle("showingDisabled")(checkbox2Disabled),
    ]),
    readout("checkbox"),
  ])

export { freshState, view }
