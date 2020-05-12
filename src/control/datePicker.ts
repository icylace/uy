import type { VDOM } from "hyperapp"
import type { ControlData, ControlOptions } from "../types"

import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"

// -----------------------------------------------------------------------------

const freshDatePicker = (value: string): ControlData<string> => ({ value })

const rawDatePicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    h ("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "date",
      onchange: handleValueWith (update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: !!etc.class,
      },
    }),
  ])
}

// datePicker :: ControlOptions -> [String] -> State -> VNode
const datePicker = component (rawDatePicker)

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): ControlData<string> => ({ value })

const rawDatetimeLocalPicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    h ("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "datetime-local",
      onchange: handleValueWith (update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])
}

// datetimeLocalPicker :: ControlOptions -> [String] -> State -> VNode
const datetimeLocalPicker = component (rawDatetimeLocalPicker)

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): ControlData<string> => ({ value })

const rawMonthPicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    h ("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "month",
      onchange: handleValueWith (update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])
}

// monthPicker :: ControlOptions -> [String] -> State -> VNode
const monthPicker = component (rawMonthPicker)

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): ControlData<string> => ({ value })

const rawTimePicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    h ("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "time",
      onchange: handleValueWith (update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])
}

// timePicker :: ControlOptions -> [String] -> State -> VNode
const timePicker = component (rawTimePicker)

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): ControlData<string> => ({ value })

const rawWeekPicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    h ("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "week",
      onchange: handleValueWith (update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: true,
      },
    }),
  ])
}

// weekPicker :: ControlOptions -> [String] -> State -> VNode
const weekPicker = component (rawWeekPicker)

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
