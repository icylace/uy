import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { overlay, busy } from "../../../lib/main"
import { always } from "../../utility/always"

const freshState = (state: Story): Story => state

const overlayNormal = overlay({ class: "test-uy-overlay" }, [
  always(h("h3", {}, text("Test Process"))),
  always(h("div", { class: "busy-wrapper" }, busy())),
])
const overlayDisabled = overlay(
  { disabled: true },
  [always(text("OVERLAY CONTENTS"))]
)

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && overlayNormal(state),
          state.showingDisabled && overlayDisabled(state),
        ]),
      ]),
    ])
  ])

export { freshState, view }
