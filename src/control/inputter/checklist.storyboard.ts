import type { VNode } from "hyperapp"
import type { Content } from "../../../lib/main"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { c, checklist, freshChecklist, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, checklist: freshChecklist([]) })

const renderLabel = <S>(label: Content<S>): Content<S> => h("div", {}, c(label))

const checklistNormal = checklist<Story>({ renderLabel })("checklist")
const checklistDisabled = checklist<Story>({ renderLabel, disabled: true })("checklist")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(checklistNormal),
          toggle("showingDisabled")(checklistDisabled),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("checklist"),
      ]),
    ]),
  ])

export { freshState, view }
