import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { freshTextarea, textarea } from "../../../lib/main"
import { readout } from "../../utility/readout"

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
        readout("textarea")(state),
      ]),
    ]),
  ])

export { freshState, view }
