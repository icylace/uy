import type { Content } from "../../../lib/main"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { c, checklist, freshChecklist, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, checklist: freshChecklist([]) })

const renderLabel = <S>(label: Content<S>): Content<S> => h("div", {}, c(label))

const checklistNormal = checklist({ renderLabel })("checklist")
const checklistDisabled = checklist({ renderLabel, disabled: true })("checklist")

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(checklistNormal),
      toggle("showingDisabled")(checklistDisabled),
    ]),
    readout("checklist"),
  ])

export { freshState, view }
