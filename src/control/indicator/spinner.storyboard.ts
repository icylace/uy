import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { box, spinner } from "../../../lib/main"

const freshState = (state: Story): Story => state

const spinner1 = (): VNode<Story> =>
  box("storyboard-uy-spinner", [text("TEST"), spinner(), text("TEST")])

const view = (_state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          spinner1(),
        ]),
      ]),
    ]),
  ])

export { freshState, view }
