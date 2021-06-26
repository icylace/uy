import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { button } from "../../../lib/main"
import { readout } from "../../utility/readout"

const freshState = (state: Story): Story =>
  ({ ...state, button: { result: null } })

const onclick = (state: Story, _event: any): Story =>
  ({ ...state, button: { result: Math.random() } })

const buttonNormal = button({ label: text("TEST"), onclick })
const buttonDisabled = button({ label: text("TEST"), onclick, disabled: true })

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && buttonNormal,
          state.showingDisabled && buttonDisabled,
        ]),
      ]),
      h("section", {}, [
        readout("button")(state),
      ]),
    ]),
  ])

export { freshState, view }
