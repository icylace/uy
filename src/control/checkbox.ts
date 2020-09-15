import type { ClassProp, VDOM } from "hyperapp"
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
  class?: ClassProp
  disabled: boolean
  label?: Contents<S>
  locked: boolean
  update: Transform<S, boolean, Event>
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
        html.label({ class: { disabled, locked } }, [
          html.input({
            disabled,
            checked: data.value,
            type: "checkbox",
            onchange: (state, event) => {
              if (!event) return state
              const target = event.target as HTMLInputElement
              return update (state, target.checked)
            },
            ...etc,
            class: cc (["uy-input", { locked, disabled }, etc.class]),
          }),
          label ? html.span (label) : null,
        ]),
      ])

export const checkbox = component (rawCheckbox)
