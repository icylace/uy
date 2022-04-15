import type { Story } from "../../types"
import { VNode, h, text } from "hyperapp"
import { panel } from "../../../lib/main"
import { always } from "../../utility/always"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story => state

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          panel("uy-storyboard-showcase-section-view", [
            (_state: Story) => text("TEST1"),
            always(text("TEST1")),
            text("TEST2"),
          ])(state),
        ]),
      ]),
    ]),
  ])
