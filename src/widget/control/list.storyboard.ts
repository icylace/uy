import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { freshList, list } from "../../../lib/main"
import { readout } from "../../utility/readout"

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
        readout("list")(state),
      ]),
    ]),
  ])

export { freshState, view }
