import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { freshPager, pager } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, pager: freshPager(100, 0) })

const pagerNormal = pager<Story>({ itemsPerPage: 10, pageRange: 2 })("pager")
const pagerDisabled = pager<Story>({ itemsPerPage: 10, pageRange: 2, disabled: true })("pager")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && pagerNormal(state),
          state.showingDisabled && pagerDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("pager")(state),
      ]),
    ]),
  ])

export { freshState, view }
