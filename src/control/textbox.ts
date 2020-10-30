import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import cc from "classcat"
import { input } from "ntml"
import { box } from "../container/box"

export type TextboxData = {
  value: string
}

export type TextboxOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  wiring: Wiring<S, TextboxData>
}

const freshTextbox = (value: string): TextboxData => {
  return { value }
}

const textbox = <S>(options: TextboxOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, wiring, ...etc } = options
  return box("uy-control uy-textbox", [
    input({
      disabled,
      readonly: locked,
      type: "text",
      value: wiring.get(state).value,
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return wiring.set(state, { value: target.value })
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

export { freshTextbox, textbox }
