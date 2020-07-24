import type { State, VDOM } from "hyperapp"
import type { Control, ControlData, LabelledControlOptions } from "../types"

import { h, text } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"

// TODO:
// - support indeterminate state
//
// setTimeout(() => {
//   const el = document.querySelectorAll("input[type='checkbox']")
//   if (el) {
//     el.indeterminate = true
//   }
//   console.log(el)
// }, 1000)
//
// const freshCheckbox = (value: boolean, indeterminate?: boolean): ControlData<boolean> => ({ indeterminate, value })

const freshCheckbox = (value: boolean): ControlData<boolean> => ({ value })

// // TODO:
// type CheckboxOptions = LabelledControlOptions

const rawCheckbox = ({ disabled, locked, label, update, ...etc }: LabelledControlOptions) => (data: ControlData<boolean>): VDOM => {
  return box ("uy-control uy-checkbox") ([
    h ("label", { class: { disabled, locked } }, [
      h ("input", {
        disabled,
        checked: data.value,
        type: "checkbox",
        onchange: <S>(state: State<S>, event: any): any => update (state, event.target.checked),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }),
      label
        ? h ("span", {}, [typeof label === "string" ? text (label) : label])
        : null,
    ]),
  ])
}

const checkbox: Control = component (rawCheckbox)

export { freshCheckbox, checkbox, rawCheckbox }
