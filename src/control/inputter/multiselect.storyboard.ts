// TODO:

import type { Story } from "../../types"

import { freshMultiselect, multiselect, panel, row, toggle } from "../../../lib/main"
import { readout } from "../../utility/readout"

const options1 = {
  one: "ONE",
  two: "TWO",
  three: "THREE",
  four: "FOUR",
  five: "FIVE",
}

const options2 = {
  one: "one",
  two: "two",
  three: "three",
  four: "four",
  five: "five",
  six: "six",
  seven: "seven",
  eight: "eight",
  nine: "nine",
  ten: "ten",
  eleven: "eleven",
  twelve: "twelve",
  thirteen: "thirteen",
  fourteen: "fourteen",
  fifteen: "fifteen",
  sixteen: "sixteen",
  seventeen: "seventeen",
  eighteen: "eighteen",
  nineteen: "nineteen",
}

const options3 = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
}

const freshState = (state: Story): Story => ({
  ...state,
  multiselect1: freshMultiselect(options1, ["two"]),
  multiselect2: freshMultiselect(options2, ["two", "six"]),
  multiselect3: freshMultiselect(options3, [3, 4].map(String)),
})

const multiselect1st1 = multiselect<Story>(options1)("multiselect1")
const multiselect1st2 = multiselect<Story>({ choices: options1 })("multiselect1")
const multiselect1st3 = multiselect<Story>({ choices: options1, disabled: true })("multiselect1")

const multiselect2nd1 = multiselect<Story>({ choices: options2, usingColumnMode: false })("multiselect2")
const multiselect2nd3 = multiselect<Story>({ choices: options2, usingColumnMode: false, disabled: true })("multiselect2")

const multiselect3rd1 = multiselect<Story>({ choices: options3, usingColumnMode: true })("multiselect3")
const multiselect3rd3 = multiselect<Story>({ choices: options3, usingColumnMode: true, disabled: true })("multiselect3")

const view =
  panel("uy-storyboard-showcase-panel", [
    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(multiselect1st1),
          toggle("showingNormal")(multiselect1st2),
          toggle("showingDisabled")(multiselect1st3),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("multiselect1"),
      ]),
    ]),

    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(multiselect2nd1),
          toggle("showingDisabled")(multiselect2nd3),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("multiselect2"),
      ]),
    ]),

    panel("uy-storyboard-showcase-section", [
      panel("uy-storyboard-showcase-section-view", [
        row([
          toggle("showingNormal")(multiselect3rd1),
          toggle("showingDisabled")(multiselect3rd3),
        ]),
      ]),
      panel("uy-storyboard-showcase-section-data", [
        readout("multiselect3"),
      ]),
    ]),
  ])

export { freshState, view }
