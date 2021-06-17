import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h } from "hyperapp"
import { dropdown, freshDropdown } from "../../../lib/main"
import { readout } from "../../utility/readout"

const choices1 = {
  one: "ONE",
  two: "TWO",
  three: "THREE",
  four: "FOUR",
  five: "FIVE",
  six: "SIX",
  seven: "SEVEN",
  eight: "EIGHT",
  nine: "NINE",
  ten: "TEN",
  eleven: "ELEVEN",
  twelve: "TWELVE",
  thirteen: "THIRTEEN",
  fourteen: "FOURTEEN",
  fifteen: "FIFTEEN",
  sixteen: "SIXTEEN",
  seventeen: "SEVENTEEN",
  eighteen: "EIGHTEEN",
  nineteen: "NINETEEN",
}

const choices2 = {
  1: "ONE",
  2: "TWO",
  3: "THREE",
  4: "FOUR",
  5: "FIVE",
  6: "SIX",
  7: "SEVEN",
  8: "EIGHT",
  9: "NINE",
}

const freshState = (state: Story): Story => ({
  ...state,
  dropdown1: freshDropdown(""),
  dropdown2: freshDropdown("1"),
})

const dropdown1Normal = dropdown<Story>(choices1)("dropdown1")
const dropdown1Disabled = dropdown<Story>({ choices: choices1, disabled: true })("dropdown1")

const dropdown2Normal = dropdown<Story>({ choices: choices2 })("dropdown2")
const dropdown2Disabled = dropdown<Story>({ choices: choices2, disabled: true })("dropdown2")

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && dropdown1Normal(state),
          state.showingDisabled && dropdown1Disabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("dropdown1")(state),
      ]),
    ]),

    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && dropdown2Normal(state),
          state.showingDisabled && dropdown2Disabled(state),
        ]),
      ]),
      h("section", {}, [
        readout("dropdown2")(state),
      ]),
    ]),
  ])

export { freshState, view }
