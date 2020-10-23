import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import cc from "classcat"
import { input } from "ntml"
import { box } from "../container/box"

export type DatePickerData = {
  value: string
}

export type DatePickerOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  wiring: Wiring<S, DatePickerData>
}

// -----------------------------------------------------------------------------

const freshDatePicker = (value: string): DatePickerData => {
  return { value }
}

const datePicker = <S>(options: DatePickerOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, wiring, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: wiring.data(state).value,
      type: "date",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.update(state, freshDatePicker(target.value))
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): DatePickerData => {
  return { value }
}

const datetimeLocalPicker = <S>(options: DatePickerOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, wiring, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: wiring.data(state).value,
      type: "datetime-local",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.update(state, freshDatetimeLocalPicker(target.value))
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): DatePickerData => {
  return { value }
}

const monthPicker = <S>(options: DatePickerOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, wiring, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: wiring.data(state).value,
      type: "month",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.update(state, freshMonthPicker(target.value))
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): DatePickerData => {
  return { value }
}

const timePicker = <S>(options: DatePickerOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, wiring, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: wiring.data(state).value,
      type: "time",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.update(state, freshTimePicker(target.value))
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): DatePickerData => {
  return { value }
}

const weekPicker = <S>(options: DatePickerOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, wiring, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      readonly: locked,
      value: wiring.data(state).value,
      type: "week",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.update(state, freshWeekPicker(target.value))
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

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
  timePicker,
  weekPicker
}
