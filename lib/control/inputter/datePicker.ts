import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"

import { get, set } from "eyepiece"
import { h } from "hyperapp"
import { box } from "../container/box"

export type DatePickerValue = string

export type DatePickerData = {
  value: DatePickerValue
}

export type DatePickerOptions<S> = {
  onchange?: Action<S, DatePickerValue>
  class?: ClassProp
  disabled?: boolean
}

// -----------------------------------------------------------------------------

const freshDatePicker = (value: DatePickerValue): DatePickerData => ({ value })

const datePicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      h("input", {
        type: "date",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): DatePickerData => ({ value })

const datetimeLocalPicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "datetime-local",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): DatePickerData => ({ value })

const monthPicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "month",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): DatePickerData => ({ value })

const timePicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "time",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): DatePickerData => ({ value })

const weekPicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-datePicker", [
      input({
        type: "week",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
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
