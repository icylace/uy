import type { ClassProp, State, VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { Transform } from "../types"

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

export type CheckboxOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  label?: Contents<S>
  locked: boolean
  update: Transform<S, boolean>
}

export type CheckboxData = {
  value: boolean
}

export const freshCheckbox = (value: boolean): CheckboxData =>
  ({ value })

export const rawCheckbox =
  <S>({ disabled, locked, label, update, ...etc }: CheckboxOptions<S>) =>
    (data: CheckboxData): VDOM<S> =>
      box ("uy-control uy-checkbox") ([
        html.label ({ class: { disabled, locked } }, [
          html.input ({
            disabled,
            checked: data.value,
            type: "checkbox",
            onchange: (state, event) => {
              if (!event) return state as State<S>
              const e = event as Event
              const target = e.target as HTMLInputElement
              return update (state, target.checked)
            },
            ...etc,
            class: cc (["uy-input", { locked, disabled }, etc.class]),
          }),
          label ? html.span (label) : null,
        ]),
      ])

export const checkbox = component (rawCheckbox)
