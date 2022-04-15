import type { Story } from "../../types"
import { VNode, h } from "hyperapp"
import { file, freshFile } from "../../../lib/main"
import { readout } from "../../utility/readout"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story =>
  ({ ...state, file: freshFile("") })

const file1Normal = file<Story>("Select your file...")("file")
const file2Normal = file<Story>({ label: "Select your file..." })("file")
const fileDisabled = file<Story>({ label: "Select your file...", disabled: true })("file")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && file1Normal(state),
          state.showingNormal && file2Normal(state),
          state.showingDisabled && fileDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("file")(state),
      ]),
    ]),
  ])
