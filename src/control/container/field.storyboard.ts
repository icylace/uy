import type { Story } from "../../types"

import { field, freshTextbox, panel, row, textbox, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, field: { textbox: freshTextbox("") } })

const field1Normal = field({}, [textbox()("field", "textbox")])
const field1Disabled = field({ disabled: true }, [
  textbox({ disabled: true })("field", "textbox"),
])

const field2Normal = field("FIELD2", [
  textbox()("field", "textbox"),
])
const field2Disabled = field({ label: "FIELD2", disabled: true }, [
  textbox({ disabled: true })("field", "textbox"),
])

const field3Normal = field({ label: "FIELD1" }, [
  textbox()("field", "textbox"),
])
const field3Disabled = field({ label: "FIELD3", disabled: true }, [
  textbox({ disabled: true })("field", "textbox"),
])

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(field1Normal),
      toggle("showingDisabled")(field1Disabled),
    ]),
    row([
      toggle("showingNormal")(field2Normal),
      toggle("showingDisabled")(field2Disabled),
    ]),
    row([
      toggle("showingNormal")(field3Normal),
      toggle("showingDisabled")(field3Disabled),
    ]),
    readout("field"),
  ])

export { freshState, view }
