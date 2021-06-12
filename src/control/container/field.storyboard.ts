import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { field, freshTextbox, textbox } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, field: { textbox: freshTextbox("") } })

const field1Normal = field({}, [textbox<Story>()("field", "textbox")])
const field1Disabled = field({ disabled: true }, [
  textbox<Story>({ disabled: true })("field", "textbox"),
])

const field2Normal = field("FIELD2", [
  textbox<Story>()("field", "textbox"),
])
const field2Disabled = field({ label: "FIELD2", disabled: true }, [
  textbox<Story>({ disabled: true })("field", "textbox"),
])

const field3Normal = field({ label: "FIELD1" }, [
  textbox<Story>()("field", "textbox"),
])
const field3Disabled = field({ label: "FIELD3", disabled: true }, [
  textbox<Story>({ disabled: true })("field", "textbox"),
])

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && field1Normal(state),
          state.showingDisabled && field1Disabled(state),
        ]),
        h("section", {}, [
          state.showingNormal && field2Normal(state),
          state.showingDisabled && field2Disabled(state),
        ]),
        h("section", {}, [
          state.showingNormal && field3Normal(state),
          state.showingDisabled && field3Disabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("field")(state),
      ]),
    ]),
  ])

export { freshState, view }
