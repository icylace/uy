import type { VNode } from "hyperapp"
import type { Tab } from "../../../lib/main"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import * as R from "remeda"
import { freshTabs, tabs } from "../../../lib/main"
import { readout } from "../../utility/readout"

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

const tabs1Normal = tabs(tabList)("tabs")
const tabs2Normal = tabs({ itemsHeader, itemsFooter, tabList })("tabs")
const tabsDisabled = tabs({ itemsHeader, itemsFooter, tabList: R.clone(tabList), disabled: true })("tabs")

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
        readout("tabs")(state),
      ]),
    ]),
  ])

export { freshState, view }