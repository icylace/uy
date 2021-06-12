import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { freshTextarea, panel, row, textarea, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, textarea: freshTextarea("") })

const textareaNormal = textarea<Story>()("textarea")
const textareaDisabled = textarea<Story>({ disabled: true })("textarea")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(textareaNormal),
          toggle("showingDisabled")(textareaDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("textarea"),
      ]),
    ]),
  ])

export { freshState, view }
