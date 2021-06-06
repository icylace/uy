import type { Story } from "../../types"

import { button, panel, row } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, button: { result: null } })

const onclick = (state: Story, _event: any): Story =>
  ({ ...state, button: { result: Math.random() } })

const buttonNormal = button({ label: "TEST", onclick })
const buttonDisabled = button({ label: "TEST", onclick, disabled: true })

const view =
  panel("uy-control-storyboard", [
    row([
      (state: Story) => state.showingNormal && buttonNormal,
      (state: Story) => state.showingDisabled && buttonDisabled,
    ]),
    readout("button"),
  ])

export { freshState, view }
