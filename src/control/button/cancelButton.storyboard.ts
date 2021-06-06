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
  panel("uy-control-storyboard", [
    row([
      (state: Story) => state.showingNormal && cancelButton1Normal,
      (state: Story) => state.showingNormal && cancelButton2Normal,
      (state: Story) => state.showingDisabled && cancelButtonDisabled,
    ]),
    readout("cancelButton"),
  ])

export { freshState, view }
