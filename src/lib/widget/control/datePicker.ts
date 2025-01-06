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

const temporalPicker = (type: string) => <S>(options: DatePickerOptions<S> = {}) => (...focus: Focus) => (state: S): VNode<S> => {
  const { onchange, disabled, ...etc } = options
  return h("div", { class: ["uwye-control uwye-datePicker", etc.class, { disabled }] }, [
    h("input", {
      type,
      value: get<DatePickerData>(focus)(state).value,
      disabled,
      onchange: (state, event) => {
        const target = event.target as HTMLInputElement
        const nextValue = target.value
        const nextState = set(focus, "value")(nextValue)(state)
        return onchange ? onchange(nextState, nextValue) : nextState
      },
      ...etc,
      class: "uwye-input",
    }),
  ])
}

// -----------------------------------------------------------------------------

const freshDatePicker =
  (value: DatePickerValue): DatePickerData => ({ value })

const datePicker = temporalPicker("date")

const freshDatetimeLocalPicker = freshDatePicker
const datetimeLocalPicker = temporalPicker("datetime-local")

const freshMonthPicker = freshDatePicker
const monthPicker = temporalPicker("month")

const freshTimePicker = freshDatePicker
const timePicker = temporalPicker("time")

const freshWeekPicker = freshDatePicker
const weekPicker = temporalPicker("week")
