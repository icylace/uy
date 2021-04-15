import type { Focus } from "eyepiece"
import type { Action, ClassProp, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../container/box"

export type TextareaValue = string

export type TextareaData = {
  value: TextareaValue
}

export type TextareaOptions<S> = {
  onchange?: Action<S, TextareaValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextarea = (value: TextareaValue): TextareaData => ({ value })

const textarea = <S>(options: TextareaOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VDOM<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-textarea", [
      html.textarea({
        value: get<TextareaData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

export { freshTextarea, textarea }
