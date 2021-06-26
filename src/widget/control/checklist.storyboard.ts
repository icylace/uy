import type { MaybeVNode, VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { checklist, freshCheckbox, freshChecklist } from "../../../lib/main"
import { readout } from "../../utility/readout"

// const freshState = (state: Story): Story =>
//   ({ ...state, checklist: freshChecklist([]) })

const freshState = (state: Story): Story => ({
  ...state,
  checklist: freshChecklist([{
    id: "sdfsdfsdfsd",
    selected: freshCheckbox(true),
  }]),
})

const renderLabel = <S>(
  label: MaybeVNode<S> | readonly MaybeVNode<S>[]
): VNode<S> => h("div", {}, label)

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
