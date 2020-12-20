import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"

import { get, set } from "eyepiece"
import { input } from "ntml"
import { box } from "../../wireless/container/box"

export type TextboxData = {
  value: string
}

export type TextboxOptions = {
  class?: ClassProp
  disabled?: boolean
}

const freshTextbox = (value: string): TextboxData => ({ value })

const textbox = <S>(options: TextboxOptions = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, ...etc } = options
    return box("uy-control uy-textbox", [
      input({
        disabled,
        type: "text",
        value: get<TextboxData>(focus)(state).value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus, "value")(target.value)(state)
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

export { freshTextbox, textbox }
