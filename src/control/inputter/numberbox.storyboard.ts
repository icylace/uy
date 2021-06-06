import type { Story } from "../../types"

import { freshNumberbox, numberbox, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, numberbox: freshNumberbox(0) })

const numberbox1Normal = numberbox("UNIT")("numberbox")
const numberbox2Normal = numberbox({ label: "UNIT" })("numberbox")
const numberboxDisabled = numberbox({ label: "UNIT", disabled: true })("numberbox")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(numberbox1Normal),
      toggle("showingNormal")(numberbox2Normal),
      toggle("showingDisabled")(numberboxDisabled),
    ]),
    readout("numberbox"),
  ])

export { freshState, view }
