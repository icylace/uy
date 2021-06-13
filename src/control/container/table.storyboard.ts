import type { VNode } from "hyperapp"
import type { TableRow } from "../../../lib/main"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { table } from "../../../lib/main"
// import { readout } from "../../utility"

const freshState = (state: Story): Story => state

const dummyTable: TableRow<Story>[] = [
  ["dfhgkldjfhg", "123", "uihew"],
  ["354", "mnb,mnb", "uihew"],
  ["dfhgkldjfhg", "123", "uihew"],
  ["354", "mnb,mnb", "uihew"],
]

const table1Normal = table({ orderColumn: null, sortDescending: false }, dummyTable)
const table1Disabled = table({ orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const headers = ["ONE", "TWO", "THREE"]

const table2Normal1 = table(headers, dummyTable)
const table2Normal2 = table({ headers, orderColumn: null, sortDescending: false }, dummyTable)
const table2Disabled = table({ headers, orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && table1Normal,
          state.showingDisabled && table1Disabled,
        ]),
        h("section", {}, [
          state.showingNormal && table2Normal1,
          state.showingNormal && table2Normal2,
          state.showingDisabled && table2Disabled,
        ]),
      ]),
      h("section", {}, [
        // readout("table")(state),
      ]),
    ]),
  ])

export { freshState, view }
