import { VNode, h } from "hyperapp"
import { readout } from "../../utility/readout"
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
  timePicker,
  weekPicker,
} from "../../../lib/main"

export { freshState, view }

// -----------------------------------------------------------------------------

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

const view = (state: Story): VNode<Story> =>
  h("section", { class: "uy-storyboard-showcase-panel" }, [
    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && datePicker1(state),
          state.showingDisabled && datePicker3(state),
        ]),
      ]),
      h("section", {}, [
        readout("datePicker")(state),
      ]),
    ]),

    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && datetimeLocalPicker1(state),
          state.showingDisabled && datetimeLocalPicker3(state),
        ]),
      ]),
      h("section", {}, [
        readout("datetimeLocalPicker")(state),
      ]),
    ]),

    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && monthPicker1(state),
          state.showingDisabled && monthPicker3(state),
        ]),
      ]),
      h("section", {}, [
        readout("monthPicker")(state),
      ]),
    ]),

    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && timePicker1(state),
          state.showingDisabled && timePicker3(state),
        ]),
      ]),
      h("section", {}, [
        readout("timePicker")(state),
      ]),
    ]),

    h("section", {}, [
      h("section", {}, [
        h("section", {}, [
          state.showingNormal && weekPicker1(state),
          state.showingDisabled && weekPicker3(state),
        ]),
      ]),
      h("section", {}, [
        readout("weekPicker")(state),
      ]),
    ]),
  ])
