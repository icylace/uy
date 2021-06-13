import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { freshNumberbox, numberbox } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, numberbox: freshNumberbox(0) })

const numberbox1Normal = numberbox<Story>("UNIT")("numberbox")
const numberbox2Normal = numberbox<Story>({ label: "UNIT" })("numberbox")
const numberboxDisabled = numberbox<Story>({ label: "UNIT", disabled: true })("numberbox")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && numberbox1Normal(state),
          state.showingNormal && numberbox2Normal(state),
          state.showingDisabled && numberboxDisabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("numberbox")(state),
      ]),
    ]),
  ])

export { freshState, view }
