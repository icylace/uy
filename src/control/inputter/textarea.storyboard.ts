import type { Story } from "../../types"

import { freshTextarea, panel, row, textarea, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, textarea: freshTextarea("") })

const textareaNormal = textarea()("textarea")
const textareaDisabled = textarea({ disabled: true })("textarea")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(textareaNormal),
      toggle("showingDisabled")(textareaDisabled),
    ]),
    readout("textarea"),
  ])

export { freshState, view }
