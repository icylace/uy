import type { Story } from "../../types"

import { file, freshFile, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, file: freshFile("") })

const file1Normal = file("Select your file...")("file")
const file2Normal = file({ label: "Select your file..." })("file")
const fileDisabled = file({ label: "Select your file...", disabled: true })("file")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(file1Normal),
      toggle("showingNormal")(file2Normal),
      toggle("showingDisabled")(fileDisabled),
    ]),
    readout("file"),
  ])

export { freshState, view }
