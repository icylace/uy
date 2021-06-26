import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { panel } from "../../../lib/main"
import { always } from "../../utility/always"

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

export { freshState, view }
