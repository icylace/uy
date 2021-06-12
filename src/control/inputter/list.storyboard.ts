import type { Story } from "../../types"

import { freshList, list, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, list: freshList([]) })

const list1Normal = list<Story>([])("list")
const list2Normal = list<Story>({ headers: [] })("list")
const listDisabled = list<Story>({ headers: [], disabled: true })("list")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(list1Normal),
          toggle("showingNormal")(list2Normal),
          toggle("showingDisabled")(listDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("list"),
      ]),
    ]),
  ])

export { freshState, view }
