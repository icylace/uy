import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { box, column, overlay, panel, row, spinner, toggle } from "../../../lib/main"
import { always } from "../../utility/always"

const freshState = (state: Story): Story => state

const overlayNormal = overlay({ class: "test-uy-overlay" }, [
  column<Story>([
    always(h("h3", {}, [text("Test Process")])),
    always(box("spinner-wrapper", [spinner()])),
  ]),
])
const overlayDisabled = overlay(
  { disabled: true },
  [column<Story>([always(text("OVERLAY CONTENTS"))])]
)

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(overlayNormal),
          toggle("showingDisabled")(overlayDisabled),
        ]),
      ]),
    ])
  ])

export { freshState, view }
