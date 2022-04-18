import { Action, ClassProp, VNode, h } from "hyperapp"
import { Focus, get, set } from "eyepiece"

export type { DatePickerData, DatePickerOptions, DatePickerValue }

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
  weekPicker,
}

// -----------------------------------------------------------------------------

type DatePickerValue = string

type DatePickerData = {
  value: DatePickerValue
}

type DatePickerOptions<S> = {
  onchange?: Action<S, DatePickerValue>
  class?: ClassProp
  disabled?: boolean
}

// -----------------------------------------------------------------------------

const freshDatePicker = (value: DatePickerValue): DatePickerData => ({ value })

const datePicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: ["uy-control uy-datePicker", etc.class, { disabled }] }, [
      h("input", {
        type: "date",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshDatetimeLocalPicker = (value: string): DatePickerData => ({ value })

const datetimeLocalPicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: ["uy-control uy-datePicker", etc.class, { disabled }] }, [
      h("input", {
        type: "datetime-local",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshMonthPicker = (value: string): DatePickerData => ({ value })

const monthPicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: ["uy-control uy-datePicker", etc.class, { disabled }] }, [
      h("input", {
        type: "month",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshTimePicker = (value: string): DatePickerData => ({ value })

const timePicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: ["uy-control uy-datePicker", etc.class, { disabled }] }, [
      h("input", {
        type: "time",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
    ])
  }
}

// -----------------------------------------------------------------------------

const freshWeekPicker = (value: string): DatePickerData => ({ value })

const weekPicker = <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: ["uy-control uy-datePicker", etc.class, { disabled }] }, [
      h("input", {
        type: "week",
        value: get<DatePickerData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
    ])
  }
}
