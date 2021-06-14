import type { VNode } from "hyperapp"
import type { BoardRow } from "../../../lib/main"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { board } from "../../../lib/main"
// import { readout } from "../utility"

const freshState = (state: Story): Story => state

const dummyTable: BoardRow<Story>[] = [
  [h("p", {}, text("123")), h("p", {}, text("uihew"))],
  [h("p", {}, text("mnb,mnb")), h("p", {}, text("uihew"))],
]

const board1Normal = board({ orderColumn: null, sortDescending: false }, dummyTable)
const board1Disabled = board({ orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const headers = ["ONE", "TWO"]

const board2Normal1 = board(headers, dummyTable)
const board2Normal2 = board({ headers, orderColumn: null, sortDescending: false }, dummyTable)
const board2Disabled = board({ headers, orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && board1Normal(state),
          state.showingDisabled && board1Disabled(state),
        ]),
        h("section", {}, [
          state.showingNormal && board2Normal1(state),
          state.showingNormal && board2Normal2(state),
          state.showingDisabled && board2Disabled(state),
        ]),
      ]),
      h("section", {}, [
        // readout("board")(state),
      ]),
    ]),
  ])

export { freshState, view }
