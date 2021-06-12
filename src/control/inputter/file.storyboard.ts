import type { Story } from "../../types"

import { file, freshFile, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, file: freshFile("") })

const file1Normal = file<Story>("Select your file...")("file")
const file2Normal = file<Story>({ label: "Select your file..." })("file")
const fileDisabled = file<Story>({ label: "Select your file...", disabled: true })("file")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(file1Normal),
          toggle("showingNormal")(file2Normal),
          toggle("showingDisabled")(fileDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("file"),
      ]),
    ]),
  ])

export { freshState, view }
