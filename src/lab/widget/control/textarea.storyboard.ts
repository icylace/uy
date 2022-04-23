import { VNode, h } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { freshTextarea, textarea } from "../../../lib/uy"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, textarea: freshTextarea("") })

const textareaNormal = textarea<Story>()("textarea")
const textareaDisabled = textarea<Story>({ disabled: true })("textarea")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && textareaNormal(state),
          state.showingDisabled && textareaDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout<Story>("textarea")(state),
      ]),
    ]),
  ])
