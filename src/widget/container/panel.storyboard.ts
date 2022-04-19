import { TypedH, VNode, h as ha, text } from "hyperapp"
import { always } from "wtv"
import type { Story } from "../../types"
import { panel } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const h: TypedH<Story> = ha

const freshState = (state: Story): Story => state

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          panel<Story>("uy-storyboard-showcase-section-view", [
            (_state: Story) => text("TEST1"),
            always(text("TEST1")),
            text("TEST2"),
          ])(state),
        ]),
      ]),
    ]),
  ])
