import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import cc from "classcat"
import * as html from "ntml"
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

export type CheckboxData = {
  value: boolean
}

export type CheckboxOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: Content<S> | Content<S>[]
  locked?: boolean
  wiring: Wiring<S, CheckboxData>
}

const freshCheckbox = (value: boolean): CheckboxData => {
  return { value }
}

const checkbox = <S>(options: CheckboxOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, label, wiring, ...etc } = options
  return box("uy-control uy-checkbox", [
    html.label({ class: { disabled: !!disabled, locked: !!locked } }, [
      html.input({
        disabled,
        checked: wiring.get(state).value,
        type: "checkbox",
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return wiring.set(state, { value: target.checked })
        },
        ...etc,
        class: cc(["uy-input", { locked, disabled }, etc.class]),
      }),
      label ? html.span(label) : null,
    ]),
  ])
}

export { checkbox, freshCheckbox }
