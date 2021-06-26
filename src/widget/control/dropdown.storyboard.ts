import type { VNode } from "hyperapp"
import type { Story } from "../../types"

import { h, text } from "hyperapp"
import { dropdown, freshDropdown } from "../../../lib/main"
import { readout } from "../../utility/readout"

const choices1 = {
  one: text("ONE"),
  two: text("TWO"),
  three: text("THREE"),
  four: text("FOUR"),
  five: text("FIVE"),
  six: text("SIX"),
  seven: text("SEVEN"),
  eight: text("EIGHT"),
  nine: text("NINE"),
  ten: text("TEN"),
  eleven: text("ELEVEN"),
  twelve: text("TWELVE"),
  thirteen: text("THIRTEEN"),
  fourteen: text("FOURTEEN"),
  fifteen: text("FIFTEEN"),
  sixteen: text("SIXTEEN"),
  seventeen: text("SEVENTEEN"),
  eighteen: text("EIGHTEEN"),
  nineteen: text("NINETEEN"),
}

const choices2 = {
  1: text("ONE"),
  2: text("TWO"),
  3: text("THREE"),
  4: text("FOUR"),
  5: text("FIVE"),
  6: text("SIX"),
  7: text("SEVEN"),
  8: text("EIGHT"),
  9: text("NINE"),
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
