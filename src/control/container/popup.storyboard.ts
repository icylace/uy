import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { text } from "hyperapp"
import { panel, popup, row } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story => state

const popupNormal: VNode<Story> = popup("popupNormal", text("TEST"))
const popupDisabled: VNode<Story> = popup({ id: "popupDisabled", disabled: true }, text("TEST"))

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel<Story>("uy-storyboard-showcase-section-view", [
        row([
          (state) => state.showingNormal && popupNormal,
          (state) => state.showingDisabled && popupDisabled,
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        // readout ("uy", "insideEl"),
        readout("popup"),
      ]),
    ]),
  ])

export { freshState, view }
