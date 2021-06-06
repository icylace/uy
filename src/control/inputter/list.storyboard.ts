import type { Story } from "../../types"

import { freshList, list, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, list: freshList([]) })

const list1Normal = list([])("list")
const list2Normal = list({ headers: [] })("list")
const listDisabled = list({ headers: [], disabled: true })("list")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(list1Normal),
      toggle("showingNormal")(list2Normal),
      toggle("showingDisabled")(listDisabled),
    ]),
    readout("list"),
  ])

export { freshState, view }
