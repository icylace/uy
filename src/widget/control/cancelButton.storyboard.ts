import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { cancelButton } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, cancelButton: { result: null } })

const onclick = (state: Story, _event: any): Story =>
  ({ ...state, cancelButton: { result: Math.random() } })

const cancelButton1Normal = cancelButton(onclick)
const cancelButton2Normal = cancelButton({ onclick })
const cancelButtonDisabled = cancelButton({ onclick, disabled: true })

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && cancelButton1Normal,
          state.showingNormal && cancelButton2Normal,
          state.showingDisabled && cancelButtonDisabled,
        ]),
      ]),
      h("section", {}, [
        readout("cancelButton")(state),
      ]),
    ]),
  ])

export { freshState, view }
