import type { Story } from "../../types"

import {
  datePicker,
  datetimeLocalPicker,
  freshDatePicker,
  freshDatetimeLocalPicker,
  freshMonthPicker,
  freshTimePicker,
  freshWeekPicker,
  monthPicker,
  panel,
  row,
  timePicker,
  toggle,
  weekPicker,
} from "../../../lib/main"

import { readout } from "../../utility/readout"

const freshState = (state: Story): Story => ({
  ...state,
  datePicker: freshDatePicker(""),
  datetimeLocalPicker: freshDatetimeLocalPicker(""),
  monthPicker: freshMonthPicker(""),
  timePicker: freshTimePicker(""),
  weekPicker: freshWeekPicker(""),
})

const datePicker1 = datePicker<Story>()("datePicker")
const datePicker3 = datePicker<Story>({ disabled: true })("datePicker")

const datetimeLocalPicker1 = datetimeLocalPicker<Story>()("datetimeLocalPicker")
const datetimeLocalPicker3 = datetimeLocalPicker<Story>({ disabled: true })("datetimeLocalPicker")

const monthPicker1 = monthPicker<Story>()("monthPicker")
const monthPicker3 = monthPicker<Story>({ disabled: true })("monthPicker")

const timePicker1 = timePicker<Story>()("timePicker")
const timePicker3 = timePicker<Story>({ disabled: true })("timePicker")

const weekPicker1 = weekPicker<Story>()("weekPicker")
const weekPicker3 = weekPicker<Story>({ disabled: true })("weekPicker")

// -----------------------------------------------------------------------------

const view =
  panel("uy-control-storyboard", [
    row([
      toggle("showingNormal")(datePicker1),
      toggle("showingDisabled")(datePicker3),
    ]),
    readout("datePicker"),

    row([
      toggle("showingNormal")(datetimeLocalPicker1),
      toggle("showingDisabled")(datetimeLocalPicker3),
    ]),
    readout("datetimeLocalPicker"),

    row([
      toggle("showingNormal")(monthPicker1),
      toggle("showingDisabled")(monthPicker3),
    ]),
    readout("monthPicker"),

    row([
      toggle("showingNormal")(timePicker1),
      toggle("showingDisabled")(timePicker3),
    ]),
    readout("timePicker"),

    row([
      toggle("showingNormal")(weekPicker1),
      toggle("showingDisabled")(weekPicker3),
    ]),
    readout("weekPicker"),
  ])

export { freshState, view }
