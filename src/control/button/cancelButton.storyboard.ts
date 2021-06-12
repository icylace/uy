import type { Story } from "../../types"

import { cancelButton, panel, row } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, cancelButton: { result: null } })

const onclick = (state: Story, _event: any): Story =>
  ({ ...state, cancelButton: { result: Math.random() } })

const cancelButton1Normal = cancelButton(onclick)
const cancelButton2Normal = cancelButton({ onclick })
const cancelButtonDisabled = cancelButton({ onclick, disabled: true })

const view =
  panel<Story>("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          (state) => state.showingNormal && cancelButton1Normal,
          (state) => state.showingNormal && cancelButton2Normal,
          (state) => state.showingDisabled && cancelButtonDisabled,
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("cancelButton"),
      ]),
    ]),
  ])

export { freshState, view }
