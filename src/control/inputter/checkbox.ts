import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { isContent } from "ntml"
import { box } from "../container/box"

export type CheckboxValue = boolean | null | undefined

export type CheckboxData = {
  value: CheckboxValue
}

export type CheckboxOptions<S>
  = Content<S>
  | {
    label?: Content<S>
    onchange?: ActionTransform<S, CheckboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshCheckbox = (value: CheckboxValue): CheckboxData => ({ value })

const checkbox = <S>(options: CheckboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, onchange, disabled, ...etc } = props
    const value = get<CheckboxData>(focus)(state).value
    return box("uy-control uy-checkbox", [
      html.label({ class: { disabled } }, [
        html.input({
          type: "checkbox",
          checked: !!value,
          indeterminate: value == null,
          disabled,
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            const nextValue = target.checked
            const nextState = set<State<S>>(focus, "value")(nextValue)(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: ["uy-input", { disabled }, etc.class],
        }),
        label ? html.span(label) : null,
      ]),
    ])
  }
}

export { checkbox, freshCheckbox }
