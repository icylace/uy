import type { VDOM } from "hyperapp"
import type { Control, ControlData, ControlOptions } from "../types"

import { input } from "../utility/html"
import { handleValueWith } from "../utility/hyperappHelper"
import { component } from "../component"
import { box } from "../container/ui"

// -----------------------------------------------------------------------------

const freshDatePicker = (value: string): ControlData<string> => ({ value })

const rawDatePicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    input ({
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

const datePicker: Control = component (rawDatePicker)

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): ControlData<string> => ({ value })

const rawDatetimeLocalPicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    input ({
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

const datetimeLocalPicker: Control = component (rawDatetimeLocalPicker)

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): ControlData<string> => ({ value })

const rawMonthPicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    input ({
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

const monthPicker: Control = component (rawMonthPicker)

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): ControlData<string> => ({ value })

const rawTimePicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    input ({
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

const timePicker: Control = component (rawTimePicker)

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): ControlData<string> => ({ value })

const rawWeekPicker = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-datePicker") ([
    input ({
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

const weekPicker: Control = component (rawWeekPicker)

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
