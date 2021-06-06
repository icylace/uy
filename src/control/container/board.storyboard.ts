import type { BoardRow } from "../../../lib/main"
import type { Story } from "../../types"

import { h, text} from "hyperapp"
import { board, panel, row, toggle } from "../../../lib/main"
// import { readout } from "../utility"

const freshState = (state: Story): Story => state

const dummyTable: BoardRow<Story>[] = [
  [(_state: Story) => h<Story>("p", {}, text("123")), (_state: Story) => h<Story>("p", {}, text("uihew"))],
  [(_state: Story) => h<Story>("p", {}, text("mnb,mnb")), (_state: Story) => h<Story>("p", {}, text("uihew"))],
]

const board1Normal = board({ orderColumn: null, sortDescending: false }, dummyTable)
const board1Disabled = board({ orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const headers = ["ONE", "TWO"]

const board2Normal1 = board(headers, dummyTable)
const board2Normal2 = board({ headers, orderColumn: null, sortDescending: false }, dummyTable)
const board2Disabled = board({ headers, orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(board1Normal),
      toggle("showingDisabled")(board1Disabled),
    ]),
    row([
      toggle("showingNormal")(board2Normal1),
      toggle("showingNormal")(board2Normal2),
      toggle("showingDisabled")(board2Disabled),
    ]),
    // readout("board"),
  ])

export { freshState, view }
