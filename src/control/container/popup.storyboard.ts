import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { popup } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story => state

const popupNormal: VNode<Story> = popup("popupNormal", text("TEST"))
const popupDisabled: VNode<Story> = popup({ id: "popupDisabled", disabled: true }, text("TEST"))

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
        readout("popup")(state),
      ]),
    ]),
  ])

export { freshState, view }
