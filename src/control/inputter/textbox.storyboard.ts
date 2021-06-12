import type { Story } from "../../types"

import { panel, row, freshTextbox, textbox, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, textbox: freshTextbox("") })

const textboxNormal = textbox<Story>()("textbox")
const textboxDisabled = textbox<Story>({ disabled: true })("textbox")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(textboxNormal),
          toggle("showingDisabled")(textboxDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("textbox"),
      ]),
    ]),
  ])

export { freshState, view }
