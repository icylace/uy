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
            row<Story>([always(text("TEST1")), always(text("TEST2")), always(text("TEST3"))]),
            column<Story>([always(text("AAA")), always(text("BBB")), always(text("CCC"))]),
            row<Story>([always(text("111")), always(text("222")), always(text("333"))]),
          ])(state),
        ]),
      ]),
    ]),
  ])

export { freshState, view }
