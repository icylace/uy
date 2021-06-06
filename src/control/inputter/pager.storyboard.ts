import type { Story } from "../../types"

import { column, freshPager, pager, panel, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, pager: freshPager(100, 0) })

const pagerNormal = pager({ itemsPerPage: 10, pageRange: 2 })("pager")
const pagerDisabled = pager({ itemsPerPage: 10, pageRange: 2, disabled: true })("pager")

const view =
  panel("uy-control-storyboard", [
    column([
      toggle("showingNormal")(pagerNormal),
      toggle("showingDisabled")(pagerDisabled),
    ]),
    readout("pager"),
  ])

export { freshState, view }
