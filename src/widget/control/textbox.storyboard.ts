import type { Story } from "../../types"
import { VNode, h } from "hyperapp"
import { freshTextbox, textbox } from "../../../lib/main"
import { readout } from "../../utility/readout"

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
        readout("textbox")(state),
      ]),
    ]),
  ])
