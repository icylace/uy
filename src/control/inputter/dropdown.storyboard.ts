import type { Story } from "../../types"

import { dropdown, freshDropdown, panel, row, toggle } from "../../../lib/main"
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

const view =
panel("uy-storyboard-showcase-panel", [
  panel("uy-storyboard-showcase-section", [
    panel("uy-storyboard-showcase-section-view", [
      row([
        toggle("showingNormal")(dropdown1Normal),
        toggle("showingDisabled")(dropdown1Disabled),
      ]),
    ]),
    panel("uy-storyboard-showcase-section-data", [
      readout("dropdown1"),
    ]),
  ]),

  panel("uy-storyboard-showcase-section", [
    panel("uy-storyboard-showcase-section-view", [
      row([
        toggle("showingNormal")(dropdown2Normal),
        toggle("showingDisabled")(dropdown2Disabled),
      ]),
    ]),
    panel("uy-storyboard-showcase-section-data", [
      readout("dropdown2"),
    ]),
  ]),
])

export { freshState, view }
