import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import * as html from "ntml"
import { isContent } from "ntml"
import { box } from "../container/box"

export type CheckboxData = {
  value: boolean | null | undefined
}

export type CheckboxOptions<S>
  = Content<S>
  | {
    class?: ClassProp
    disabled?: boolean
    label?: Content<S>
  }

const freshCheckbox = (value: boolean | null | undefined): CheckboxData => {
  return { value }
}

const checkbox = <S>(options: CheckboxOptions<S> = {}) => (wiring: Wiring<CheckboxData, S>) => (state: State<S>): VDOM<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { disabled, label, ...etc } = props
  const value = wiring.get(state).value
  return box("uy-control uy-checkbox", [
    html.label({ class: { disabled } }, [
      html.input({
        disabled,
        checked: !!value,
        indeterminate: value == null,
        type: "checkbox",
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return wiring.set(state, { value: target.checked })
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
      label ? html.span(label) : null,
    ]),
  ])
}

export { checkbox, freshCheckbox }
