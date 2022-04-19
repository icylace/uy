import { VNode, h, text } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { freshNumberbox, numberbox } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, numberbox: freshNumberbox(0) })

const numberbox1Normal = numberbox<Story>(text("UNIT"))("numberbox")
const numberbox2Normal = numberbox<Story>({ label: text("UNIT") })("numberbox")
const numberboxDisabled = numberbox<Story>({ label: text("UNIT"), disabled: true })("numberbox")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && numberbox1Normal(state),
          state.showingNormal && numberbox2Normal(state),
          state.showingDisabled && numberboxDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("numberbox")(state),
      ]),
    ]),
  ])
