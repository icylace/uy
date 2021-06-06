import type { Story } from "../../types"

import { freshRadios, panel, radios, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, radios: freshRadios("") })

const choices = {
  one: "ONE",
  two: "TWO",
  three: "THREE",
  four: "FOUR",
  five: "FIVE",
}

const radios1Normal = radios(choices)("radios")
const radios2Normal = radios({ choices })("radios")
const radiosDisabled = radios({ choices, disabled: true })("radios")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(radios1Normal),
      toggle("showingNormal")(radios2Normal),
      toggle("showingDisabled")(radiosDisabled),
    ]),
    readout("radios"),
  ])

export { freshState, view }
