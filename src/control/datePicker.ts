import type { ClassProp, Transform, VDOM } from "hyperapp"

import cc from "classcat"
import { input } from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type DatePickerOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  update: Transform<S>
}

export type DatePickerData = {
  value: string
}

// -----------------------------------------------------------------------------

export const freshDatePicker = (value: string): DatePickerData =>
  ({ value })

const rawDatePicker = <S>(props: DatePickerOptions<S>, data: DatePickerData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: data.value,
      type: "date",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return update(state, target.value)
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

export const datePicker = component(rawDatePicker)

// -----------------------------------------------------------------------------

export const freshDatetimeLocalPicker = (value: string): DatePickerData =>
  ({ value })

const rawDatetimeLocalPicker = <S>(props: DatePickerOptions<S>, data: DatePickerData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: data.value,
      type: "datetime-local",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return update(state, target.value)
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

export const datetimeLocalPicker = component(rawDatetimeLocalPicker)

// -----------------------------------------------------------------------------

export const freshMonthPicker = (value: string): DatePickerData =>
  ({ value })

const rawMonthPicker = <S>(props: DatePickerOptions<S>, data: DatePickerData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: data.value,
      type: "month",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return update(state, target.value)
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

export const monthPicker = component(rawMonthPicker)

// -----------------------------------------------------------------------------

export const freshTimePicker = (value: string): DatePickerData =>
  ({ value })

const rawTimePicker = <S>(props: DatePickerOptions<S>, data: DatePickerData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: data.value,
      type: "time",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return update(state, target.value)
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

export const timePicker = component(rawTimePicker)

// -----------------------------------------------------------------------------

export const freshWeekPicker = (value: string): DatePickerData =>
  ({ value })

const rawWeekPicker = <S>(props: DatePickerOptions<S>, data: DatePickerData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: data.value,
      type: "week",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return update(state, target.value)
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

export const weekPicker = component(rawWeekPicker)
