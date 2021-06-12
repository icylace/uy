import type { Tab } from "../../../lib/main"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import * as R from "remeda"
import { box, column, freshTabs, panel, tabs, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, tabs: freshTabs("fiver") })

const itemsHeader = null
const itemsFooter = null

const tabList: Tab<Story>[] = [
  {
    heading: h("h2", {}, [text("test3")]),
    panel: box("", [text("test4")]),
  },
  {
    heading: h("p", { "data-tab-id": "fiver" }, text("test5")),
    panel: box("", text("test6")),
  },
  {
    heading: box("", [box("", text("test7")), box("", text("test7.1"))]),
    panel: box("", text("test8")),
  },
  {
    heading: h("h2", {}, text("lorem")),
    panel: box("", text("test41")),
  },
  {
    heading: h("h2", {}, text("ouhgdlrhg")),
    panel: box("", text("test42")),
  },
  {
    heading: h("h2", {}, text("wfigegd")),
    panel: box("", text("test43")),
  },
  {
    heading: h("h2", {}, text("ncvbxc,m")),
    panel: box("", text("test44")),
  },
  {
    heading: h("h2", {}, text("8746589")),
    panel: box("", text("test45")),
  },
]

const tabs1Normal = tabs(tabList)("tabs")
const tabs2Normal = tabs({ itemsHeader, itemsFooter, tabList })("tabs")
const tabsDisabled = tabs({ itemsHeader, itemsFooter, tabList: R.clone(tabList), disabled: true })("tabs")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        column([
          toggle("showingNormal")(tabs1Normal),
          toggle("showingNormal")(tabs2Normal),
          toggle("showingDisabled")(tabsDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("tabs"),
      ]),
    ]),
  ])

export { freshState, view }
