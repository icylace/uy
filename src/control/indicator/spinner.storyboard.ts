import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { text } from "hyperapp"
import { box, panel, spinner, row } from "../../../lib/main"

const freshState = (state: Story): Story => state

const spinner1 = (_state: Story): VNode<Story> =>
  box("storyboard-uy-spinner", [text("TEST"), spinner(), text("TEST")])

const view =
  panel("uy-control-storyboard", [
    row([spinner1]),
  ])

export { freshState, view }
