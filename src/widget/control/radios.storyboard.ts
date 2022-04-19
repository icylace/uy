import { VNode, h, text } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { freshRadios, radios } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, radios: freshRadios("") })

const choices = {
  one: text("ONE"),
  two: text("TWO"),
  three: text("THREE"),
  four: text("FOUR"),
  five: text("FIVE"),
}

const radios1Normal = radios<Story>(choices)("radios")
const radios2Normal = radios<Story>({ choices })("radios")
const radiosDisabled = radios<Story>({ choices, disabled: true })("radios")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && radios1Normal(state),
          state.showingNormal && radios2Normal(state),
          state.showingDisabled && radiosDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("radios")(state),
      ]),
    ]),
  ])
