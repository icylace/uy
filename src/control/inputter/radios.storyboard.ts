import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { freshRadios, radios } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, radios: freshRadios("") })

const choices = {
  one: "ONE",
  two: "TWO",
  three: "THREE",
  four: "FOUR",
  five: "FIVE",
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
        readout("radios")(state),
      ]),
    ]),
  ])

export { freshState, view }
