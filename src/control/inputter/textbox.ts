import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import { input } from "ntml"
import { box } from "../container/box"

export type TextboxValue = string

export type TextboxData = {
  value: string
}

export type TextboxOptions<S> = {
  onchange?: ActionTransform<S, TextboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextbox = (value: TextboxValue): TextboxData => ({ value })

const textbox = <S>(options: TextboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-textbox", [
      input({
        type: "text",
        value: get<TextboxData>(focus)(state).value,
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

export { freshTextbox, textbox }
