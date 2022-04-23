import { VNode, h } from "hyperapp"
import type { Story } from "../../types"
import { icon } from "../../../lib/uy"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story => state

const icon1 = (): VNode<Story> => icon("fas fa-filter")
const icon2 = (): VNode<Story> => icon("fas fa-file-download")
const icon3 = (): VNode<Story> => icon("fas fa-chart-bar")
const icon4 = (): VNode<Story> => icon("fas fa-search")
const icon5 = (): VNode<Story> => icon("fas fa-spinner fa-pulse")
const icon6 = (): VNode<Story> => icon("fas fa-angle-double-left")
const icon7 = (): VNode<Story> => icon("fas fa-angle-left")
const icon8 = (): VNode<Story> => icon("fas fa-angle-right")
const icon9 = (): VNode<Story> => icon("fas fa-angle-double-right")

const view = (_state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          icon1(),
          icon2(),
          icon3(),
          icon4(),
          icon5(),
          icon6(),
          icon7(),
          icon8(),
          icon9(),
        ]),
      ]),
    ]),
  ])
