import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../../wireless/container/box"

export type TextareaData = {
  value: string
}

export type TextareaOptions = {
  class?: ClassProp
  disabled?: boolean
}

const freshTextarea = (value: string): TextareaData => {
  return { value }
}

const textarea = <S>(options: TextareaOptions = {}) => (...focus: Focus) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-textarea", [
    html.textarea({
      disabled,
      value: get<TextareaData>(focus)(state).value,
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return set<State<S>>(focus, "value")(target.value)(state) ?? state
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    }),
  ])
}

export { freshTextarea, textarea }
