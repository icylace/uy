import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { handleValueWith } from "../utility/event"

// -----------------------------------------------------------------------------

// freshDatePicker :: String -> ControlData
const freshDatePicker = (value: string): any => ({ value })

// rawDatePicker :: ControlOptions -> Object -> VNode
const rawDatePicker = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-datePicker")([
    h("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "date",
      onchange: handleValueWith(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: !!etc.class,
      },
    }),
  ])

// datePicker :: ControlOptions -> [String] -> State -> VNode
const datePicker = component(rawDatePicker)

// -----------------------------------------------------------------------------

// freshDatetimeLocalPicker :: String -> ControlData
const freshDatetimeLocalPicker = (value: string) => ({ value })

// rawDatetimeLocalPicker :: ControlOptions -> Object -> VNode
const rawDatetimeLocalPicker = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-datePicker")([
    h("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "datetime-local",
      onchange: handleValueWith(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])

// datetimeLocalPicker :: ControlOptions -> [String] -> State -> VNode
const datetimeLocalPicker = component(rawDatetimeLocalPicker)

// -----------------------------------------------------------------------------

// freshMonthPicker :: String -> ControlData
const freshMonthPicker = (value: string): any => ({ value })

// rawMonthPicker :: ControlOptions -> Object -> VNode
const rawMonthPicker = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-datePicker")([
    h("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "month",
      onchange: handleValueWith(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])

// monthPicker :: ControlOptions -> [String] -> State -> VNode
const monthPicker = component(rawMonthPicker)

// -----------------------------------------------------------------------------

// freshTimePicker :: String -> ControlData
const freshTimePicker = (value: string): any => ({ value })

// rawTimePicker :: ControlOptions -> Object -> VNode
const rawTimePicker = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-datePicker")([
    h("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "time",
      onchange: handleValueWith(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])

// timePicker :: ControlOptions -> [String] -> State -> VNode
const timePicker = component(rawTimePicker)

// -----------------------------------------------------------------------------

// freshWeekPicker :: String -> ControlData
const freshWeekPicker = (value: string): any => ({ value })

// rawWeekPicker :: ControlOptions -> Object -> VNode
const rawWeekPicker = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-datePicker")([
    h("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "week",
      onchange: handleValueWith(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])

// weekPicker :: ControlOptions -> [String] -> State -> VNode
const weekPicker = component(rawWeekPicker)

// -----------------------------------------------------------------------------

export {
  datePicker,
  datetimeLocalPicker,
  freshDatePicker,
  freshDatetimeLocalPicker,
  freshMonthPicker,
  freshTimePicker,
  freshWeekPicker,
  monthPicker,
  rawDatePicker,
  rawDatetimeLocalPicker,
  rawMonthPicker,
  rawTimePicker,
  rawWeekPicker,
  timePicker,
  weekPicker,
}
