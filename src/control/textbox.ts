import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import { input } from "ntml"
import { box } from "../container/box"

export type TextboxData = {
  value: string
}

export type TextboxOptions = {
  class?: ClassProp
  disabled?: boolean
}

const freshTextbox = (value: string): TextboxData => {
  return { value }
}

const textbox = <S>(options: TextboxOptions) => (wiring: Wiring<S, TextboxData>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-textbox", [
    input({
      disabled,
      type: "text",
      value: wiring.get(state).value,
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: ["uy-input", { disabled }, etc.class],
    }),
  ])
}

export { freshTextbox, textbox }
