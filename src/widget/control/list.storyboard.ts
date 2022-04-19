import { VNode, h } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { freshList, list } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, list: freshList([]) })

const list1Normal = list<Story>([])("list")
const list2Normal = list<Story>({ headers: [] })("list")
const listDisabled = list<Story>({ headers: [], disabled: true })("list")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && list1Normal(state),
          state.showingNormal && list2Normal(state),
          state.showingDisabled && listDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("list")(state),
      ]),
    ]),
  ])
