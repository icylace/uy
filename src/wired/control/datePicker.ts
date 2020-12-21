import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
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

const freshDatePicker = (value: string): DatePickerData => ({ value })

const datePicker = <S>(options: DatePickerOptions = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "date",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus, "value")(target.value)(state)
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): DatePickerData => ({ value })

const datetimeLocalPicker = <S>(options: DatePickerOptions = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "datetime-local",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus, "value")(target.value)(state)
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): DatePickerData => ({ value })

const monthPicker = <S>(options: DatePickerOptions = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "month",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus, "value")(target.value)(state)
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): DatePickerData => ({ value })

const timePicker = <S>(options: DatePickerOptions = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "time",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus, "value")(target.value)(state)
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): DatePickerData => ({ value })

const weekPicker = <S>(options: DatePickerOptions = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "week",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus, "value")(target.value)(state)
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
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
