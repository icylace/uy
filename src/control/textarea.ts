import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import * as html from "ntml"
import { box } from "../container/box"

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

const textarea = <S>(options: TextareaOptions = {}) => (wiring: Wiring<TextareaData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, ...etc } = options
  return box("uy-control uy-textarea", [
    html.textarea({
      disabled,
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

export { freshTextarea, textarea }
