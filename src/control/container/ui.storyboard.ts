// TODO:
// - get rid of this ?

import type { Story } from "../../types"

import { text } from "hyperapp"
import { column, panel, row } from "../../../lib/main"
import { always } from "../../utility/always"

const freshState = (state: Story): Story => state

const view =
  panel("uy-control-storyboard", [
    (_state: Story) => text("TEST1"),
    row([always(text("TEST1")), always(text("TEST2")), always(text("TEST3"))]),
    column([always(text("AAA")), always(text("BBB")), always(text("CCC"))]),
    row([always(text("111")), always(text("222")), always(text("333"))]),
  ])

export { freshState, view }
