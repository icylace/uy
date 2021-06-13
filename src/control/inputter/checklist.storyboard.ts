import type { VNode } from "hyperapp"
import type { Content } from "../../../lib/main"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { c, checklist, freshChecklist } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, checklist: freshChecklist([]) })

const renderLabel = <S>(label: Content<S>): Content<S> => h("div", {}, c(label))

const checklistNormal = checklist<Story>({ renderLabel })("checklist")
const checklistDisabled = checklist<Story>({ renderLabel, disabled: true })("checklist")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && checklistNormal(state),
          state.showingDisabled && checklistDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("checklist")(state),
      ]),
    ]),
  ])

export { freshState, view }
