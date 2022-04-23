import { VNode, h } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { freshPager, pager } from "../../../lib/uy"

export { freshState, view }

// -----------------------------------------------------------------------------

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
        readout<Story>("pager")(state),
      ]),
    ]),
  ])
