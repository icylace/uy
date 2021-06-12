import type { Story } from "../../types"

import { text } from "hyperapp"
import { fieldset, panel, row, toggle } from "../../../lib/main"
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

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(fieldset1Normal),
          toggle("showingDisabled")(fieldset1Disabled),
        ]),
        row([
          toggle("showingNormal")(fieldset2Normal),
          toggle("showingDisabled")(fieldset2Disabled),
        ]),
      ]),
    ]),
  ])

export { freshState, view }
