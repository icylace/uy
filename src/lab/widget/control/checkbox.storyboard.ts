import { VNode, h, text } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { checkbox, freshCheckbox } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, checkbox: freshCheckbox(null) })

const checkbox1Normal = checkbox<Story>(text("CHECK TEST"))("checkbox")
const checkbox1Disabled = checkbox<Story>({ label: text("CHECK TEST"), disabled: true })("checkbox")

const checkbox2Normal = checkbox<Story>({ label: text("CHECK TEST") })("checkbox")
const checkbox2Disabled = checkbox<Story>({ label: text("CHECK TEST"), disabled: true })("checkbox")

// TODO:
// - try out indeterminate state

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && checkbox1Normal(state),
          state.showingDisabled && checkbox1Disabled(state),
        ]),
        h("section", {}, [
          state.showingNormal && checkbox2Normal(state),
          state.showingDisabled && checkbox2Disabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("checkbox")(state),
      ]),
    ]),
  ])
