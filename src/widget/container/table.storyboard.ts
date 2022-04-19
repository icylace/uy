import { VNode, h, text } from "hyperapp"
// import { readout } from "hyperapplicable"
import type { Story } from "../../types"
import { TableRow, table } from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

const freshState = (state: Story): Story => state

const dummyTable: TableRow<Story>[] = [
  [text("dfhgkldjfhg"), text("123"), text("uihew")],
  [text("354"), text("mnb,mnb"), text("uihew")],
  [h("p", {}, text("123")), h("p", {}, text("uihew"))],
  [h("p", {}, text("mnb,mnb")), h("p", {}, text("uihew"))],
]

const table1Normal = table({ orderColumn: null, sortDescending: false }, dummyTable)
const table1Disabled = table({ orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const headers = [text("ONE"), text("TWO"), text("THREE")]

const table2Normal1 = table(headers, dummyTable)
const table2Normal2 = table({ headers, orderColumn: null, sortDescending: false }, dummyTable)
const table2Disabled = table({ headers, orderColumn: null, sortDescending: false, disabled: true }, dummyTable)

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && table1Normal(state),
          state.showingDisabled && table1Disabled(state),
        ]),
        h("section", {}, [
          state.showingNormal && table2Normal1(state),
          state.showingNormal && table2Normal2(state),
          state.showingDisabled && table2Disabled(state),
        ]),
      ]),
      h("section", {}, [
        // readout<Story>("table")(state),
      ]),
    ]),
  ])
