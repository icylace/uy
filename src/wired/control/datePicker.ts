import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../../component"

import { input } from "ntml"
import { box } from "../../wireless/container/box"

export type DatePickerData = {
  value: string
}

export type DatePickerOptions = {
  class?: ClassProp
  disabled?: boolean
}

// -----------------------------------------------------------------------------

const freshDatePicker = (value: string): DatePickerData => {
  return { value }
}

const datePicker = <S>(options: DatePickerOptions = {}) => (wiring: Wiring<DatePickerData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      value: wiring.get(state).value,
      type: "date",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): DatePickerData => {
  return { value }
}

const datetimeLocalPicker = <S>(options: DatePickerOptions = {}) => (wiring: Wiring<DatePickerData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      value: wiring.get(state).value,
      type: "datetime-local",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): DatePickerData => {
  return { value }
}

const monthPicker = <S>(options: DatePickerOptions = {}) => (wiring: Wiring<DatePickerData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      value: wiring.get(state).value,
      type: "month",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): DatePickerData => {
  return { value }
}

const timePicker = <S>(options: DatePickerOptions = {}) => (wiring: Wiring<DatePickerData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      value: wiring.get(state).value,
      type: "time",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): DatePickerData => {
  return { value }
}

const weekPicker = <S>(options: DatePickerOptions = {}) => (wiring: Wiring<DatePickerData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-datePicker", [
    input({
      disabled,
      value: wiring.get(state).value,
      type: "week",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
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
