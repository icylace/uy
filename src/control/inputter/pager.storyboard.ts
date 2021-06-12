import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { column, freshPager, pager, panel, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, pager: freshPager(100, 0) })

const pagerNormal = pager<Story>({ itemsPerPage: 10, pageRange: 2 })("pager")
const pagerDisabled = pager<Story>({ itemsPerPage: 10, pageRange: 2, disabled: true })("pager")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        column([
          toggle("showingNormal")(pagerNormal),
          toggle("showingDisabled")(pagerDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("pager"),
      ]),
    ]),
  ])

export { freshState, view }
