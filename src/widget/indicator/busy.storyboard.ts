import type { Story } from "../../types"
import { VNode, h, text } from "hyperapp"
import { busy } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story => state

const spinner1 = (): VNode<Story> =>
  h("div", { class: "storyboard-uy-busy" }, [
    text("TEST"),
    busy(),
    text("TEST"),
  ])

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
