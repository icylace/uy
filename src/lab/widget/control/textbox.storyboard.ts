import { VNode, h } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { freshTextbox, textbox } from "../../../lib/uy"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, textbox: freshTextbox("") })

const textboxNormal = textbox<Story>()("textbox")
const textboxDisabled = textbox<Story>({ disabled: true })("textbox")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && textboxNormal(state),
          state.showingDisabled && textboxDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("textbox")(state),
      ]),
    ]),
  ])
