import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../container/box"

export type TextareaValue = string

export type TextareaData = {
  value: TextareaValue
}

export type TextareaOptions<S> = {
  onchange?: ActionTransform<S, TextareaValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextarea = (value: TextareaValue): TextareaData => ({ value })

const textarea = <S>(options: TextareaOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-textarea", [
      html.textarea({
        value: get<TextareaData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<State<S>>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

export { freshTextarea, textarea }
