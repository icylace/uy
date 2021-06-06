import type { TableRow } from "../../../lib/main"
import type { Story } from "../../types"

import { panel, row, table } from "../../../lib/main"
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

const view =
  panel("uy-control-storyboard", [
    row([
      (state: Story) => state.showingNormal && table1Normal,
      (state: Story) => state.showingDisabled && table1Disabled,
    ]),
    row([
      (state: Story) => state.showingNormal && table2Normal1,
      (state: Story) => state.showingNormal && table2Normal2,
      (state: Story) => state.showingDisabled && table2Disabled,
    ]),
    // readout("table"),
  ])

export { freshState, view }
