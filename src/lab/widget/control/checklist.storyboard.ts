import { MaybeVNode, VNode, h } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { checklist, freshCheckbox, freshChecklist } from "../../../lib/uy"

export { freshState, view }

// -----------------------------------------------------------------------------

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
        readout<Story>("checklist")(state),
      ]),
    ]),
  ])
