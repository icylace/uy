import type { State, VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { ComponentOptions, Control, ControlData, Handler } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

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
// const freshCheckbox = (value: boolean, indeterminate?: boolean): CheckboxData => ({ indeterminate, value })

export type CheckboxOptions = ComponentOptions & {
  label?: Contents
  update: Handler
}

export type CheckboxData = ControlData<boolean>

export const freshCheckbox = (value: boolean): CheckboxData =>
  ({ value })

export const rawCheckbox = ({ disabled, locked, label, update, ...etc }: CheckboxOptions) => (data: CheckboxData): VDOM =>
  box ("uy-control uy-checkbox") ([
    html.label ({ class: { disabled, locked } }, [
      html.input ({
        disabled,
        checked: data.value,
        type: "checkbox",
        onchange: <S>(state: State<S>, event: Event): State<S> => {
          const target = event.target as HTMLInputElement
          return update (state, target.checked)
        },
        ...etc,
        class: cc (["uy-input", { locked, disabled }, etc.class]),
      }),
      label ? html.span (label) : null,
    ]),
  ])

export const checkbox: Control = component (rawCheckbox)
