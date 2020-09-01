import type { ClassProp, VDOM } from "hyperapp"
import type { Control, ControlData, Handler } from "../types"

import cc from "classcat"
import { input } from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { component } from "../component"
import { box } from "../container/box"

export type DatePickerOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Handler
}

export type DatePickerData = ControlData<string>

// -----------------------------------------------------------------------------

export const freshDatePicker = (value: string): DatePickerData =>
  ({ value })

const rawDatePicker = ({ disabled, locked, update, ...etc }: DatePickerOptions) => (data: DatePickerData): VDOM =>
  box ("uy-control uy-datePicker") ([
    input ({
      disabled,
      readonly: locked,
      value: data.value,
      type: "date",
      onchange: handleValueWith (update),
      ...etc,
      class: cc (["uy-input", { locked, disabled }, etc.class]),
    }),
  ])

export const datePicker: Control = component (rawDatePicker)

// -----------------------------------------------------------------------------

export const freshDatetimeLocalPicker = (value: string): DatePickerData =>
  ({ value })

const rawDatetimeLocalPicker =
  ({ disabled, locked, update, ...etc }: DatePickerOptions) =>
    (data: DatePickerData): VDOM =>
      box ("uy-control uy-datePicker") ([
        input ({
          disabled,
          readonly: locked,
          value: data.value,
          type: "datetime-local",
          onchange: handleValueWith (update),
          ...etc,
          class: cc (["uy-input", { locked, disabled }, etc.class]),
        }),
      ])

export const datetimeLocalPicker: Control = component (rawDatetimeLocalPicker)

// -----------------------------------------------------------------------------

export const freshMonthPicker = (value: string): DatePickerData =>
  ({ value })

const rawMonthPicker = ({ disabled, locked, update, ...etc }: DatePickerOptions) => (data: DatePickerData): VDOM =>
  box ("uy-control uy-datePicker") ([
    input ({
      disabled,
      readonly: locked,
      value: data.value,
      type: "month",
      onchange: handleValueWith (update),
      ...etc,
      class: cc (["uy-input", { locked, disabled }, etc.class]),
    }),
  ])

export const monthPicker: Control = component (rawMonthPicker)

// -----------------------------------------------------------------------------

export const freshTimePicker = (value: string): DatePickerData =>
  ({ value })

const rawTimePicker = ({ disabled, locked, update, ...etc }: DatePickerOptions) => (data: DatePickerData): VDOM =>
  box ("uy-control uy-datePicker") ([
    input ({
      disabled,
      readonly: locked,
      value: data.value,
      type: "time",
      onchange: handleValueWith (update),
      ...etc,
      class: cc (["uy-input", { locked, disabled }, etc.class]),
    }),
  ])

export const timePicker: Control = component (rawTimePicker)

// -----------------------------------------------------------------------------

export const freshWeekPicker = (value: string): DatePickerData => ({ value })

const rawWeekPicker = ({ disabled, locked, update, ...etc }: DatePickerOptions) => (data: DatePickerData): VDOM =>
  box ("uy-control uy-datePicker") ([
    input ({
      disabled,
      readonly: locked,
      value: data.value,
      type: "week",
      onchange: handleValueWith (update),
      ...etc,
      class: cc (["uy-input", { locked, disabled }, etc.class]),
    }),
  ])

export const weekPicker: Control = component (rawWeekPicker)
