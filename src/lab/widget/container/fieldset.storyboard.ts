import { VNode, h, text } from "hyperapp"
import { always } from "wtv"
import type { Story } from "../../types"
import { fieldset } from "../../../lib/uy"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story => state

const fieldset1Normal = fieldset<Story>({}, [always(text("FIELDSET CONTENTS"))])
const fieldset1Disabled = fieldset<Story>(
  { disabled: true },
  [always(text("FIELDSET CONTENTS"))]
)

const fieldset2Normal = fieldset<Story>(
  { label: text("TEST") },
  [always(text("FIELDSET CONTENTS"))]
)
const fieldset2Disabled = fieldset<Story>(
  { label: text("TEST"), disabled: true },
  [always(text("FIELDSET CONTENTS"))]
)

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && fieldset1Normal(state),
          state.showingDisabled && fieldset1Disabled(state),
        ]),
        h("section", {}, [
          state.showingNormal && fieldset2Normal(state),
          state.showingDisabled && fieldset2Disabled(state),
        ]),
      ]),
    ]),
  ])
