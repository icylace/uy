import { VNode, h, text } from "hyperapp"
import { readout } from "hyperapplicable"
import structuredClone from "@ungap/structured-clone"
// import * as R from "remeda"
import type { Story } from "../../types"
import { Tab, freshTabs, tabs } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, tabs: freshTabs("fiver") })

const itemsHeader = null
const itemsFooter = null

const tabList: Tab<Story>[] = [
  {
    heading: h("h2", {}, [text("test3")]),
    panel: h("div", {}, [text("test4")]),
  },
  {
    heading: h("p", { "data-tab-id": "fiver" }, text("test5")),
    panel: h("div", {}, text("test6")),
  },
  {
    heading: h("div", {}, [h("div", {}, text("test7")), h("div", {}, text("test7.1"))]),
    panel: h("div", {}, text("test8")),
  },
  {
    heading: h("h2", {}, text("lorem")),
    panel: h("div", {}, text("test41")),
  },
  {
    heading: h("h2", {}, text("ouhgdlrhg")),
    panel: h("div", {}, text("test42")),
  },
  {
    heading: h("h2", {}, text("wfigegd")),
    panel: h("div", {}, text("test43")),
  },
  {
    heading: h("h2", {}, text("ncvbxc,m")),
    panel: h("div", {}, text("test44")),
  },
  {
    heading: h("h2", {}, text("8746589")),
    panel: h("div", {}, text("test45")),
  },
]

const tabListCopy = structuredClone(tabList)

const tabs1Normal = tabs<Story>(tabList)("tabs")
const tabs2Normal = tabs<Story>({ itemsHeader, itemsFooter, tabList })("tabs")
// const tabsDisabled = tabs<Story>({ itemsHeader, itemsFooter, tabList: R.clone(tabList), disabled: true })("tabs")
const tabsDisabled = tabs<Story>({ itemsHeader, itemsFooter, tabList: tabListCopy, disabled: true })("tabs")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && tabs1Normal(state),
          state.showingNormal && tabs2Normal(state),
          state.showingDisabled && tabsDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("tabs")(state),
      ]),
    ]),
  ])
