import type { Story } from "../../types"

import { panel, row, freshTextbox, textbox, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, textbox: freshTextbox("") })

const textboxNormal = textbox()("textbox")
const textboxDisabled = textbox({ disabled: true })("textbox")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(textboxNormal),
      toggle("showingDisabled")(textboxDisabled),
    ]),
    readout("textbox"),
  ])

export { freshState, view }
