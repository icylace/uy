import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { text } from "hyperapp"
import { panel, popup, row } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story => state

const popupNormal: VNode<Story> = popup("popupNormal", text("TEST"))
const popupDisabled: VNode<Story> = popup({ id: "popupDisabled", disabled: true }, text("TEST"))

const view =
  panel("uy-control-storyboard", [
    row<Story>([
      (state: Story) => state.showingNormal && popupNormal,
      (state: Story) => state.showingDisabled && popupDisabled,
    ]),
    // readout ("uy", "insideEl"),
    readout("popup"),
  ])

export { freshState, view }
