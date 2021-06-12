import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { icon, panel, row } from "../../../lib/main"

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

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9]),
      ]),
    ]),
  ])

export { freshState, view }
