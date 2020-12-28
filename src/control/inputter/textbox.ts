import type { Focus } from "eyepiece"
import type { ClassProp, State, Transform, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import { input } from "ntml"
import { box } from "../container/box"

export type TextboxValue = string

export type TextboxData = {
  value: string
}

export type TextboxOptions<S> = {
  onchange?: Transform<S, TextboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextbox = (value: string): TextboxData => ({ value })

const textbox = <S>(options: TextboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { onchange, disabled, ...etc } = options
    return box("uy-control uy-textbox", [
      input({
        value: get<TextboxData>(focus)(state).value,
        type: "text",
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
