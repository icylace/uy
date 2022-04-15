import type { Story } from "../../types"
import { VNode, h, text } from "hyperapp"
import { popper } from "../../../lib/main"
import { readout } from "../../utility/readout"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story => state

const popupNormal: VNode<Story> = popper("popupNormal", text("TEST"))
const popupDisabled: VNode<Story> = popper({ id: "popupDisabled", disabled: true }, text("TEST"))

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && popupNormal,
          state.showingDisabled && popupDisabled,
        ]),
      ]),
      h("section", {}, [
        // readout ("uy", "insideEl")(state),
        readout("popper")(state),
      ]),
    ]),
  ])
