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

const radios1Normal = radios<Story>(choices)("radios")
const radios2Normal = radios<Story>({ choices })("radios")
const radiosDisabled = radios<Story>({ choices, disabled: true })("radios")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(radios1Normal),
          toggle("showingNormal")(radios2Normal),
          toggle("showingDisabled")(radiosDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("radios"),
      ]),
    ]),
  ])

export { freshState, view }
