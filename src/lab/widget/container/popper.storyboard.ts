import { VNode, h, text } from "hyperapp"
import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { popper } from "../../../lib/main"

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
        // readout<Story>("uy", "insideEl")(state),
        readout<Story>("popper")(state),
      ]),
    ]),
  ])
