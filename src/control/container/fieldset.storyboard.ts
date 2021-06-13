import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { fieldset } from "../../../lib/main"
import { always } from "../../utility/always"

const freshState = (state: Story): Story => {
  return state
}

const fieldset1Normal = fieldset<Story>({}, [always(text("FIELDSET CONTENTS"))])
const fieldset1Disabled = fieldset<Story>(
  { disabled: true },
  [always(text("FIELDSET CONTENTS"))]
)

const fieldset2Normal = fieldset<Story>(
  { label: "TEST" },
  [always(text("FIELDSET CONTENTS"))]
)
const fieldset2Disabled = fieldset<Story>(
  { label: "TEST", disabled: true },
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

export { freshState, view }
