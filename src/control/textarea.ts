import type { ClassProp, State, VDOM } from "hyperapp"
import type { Wiring } from "../component"

import * as html from "ntml"
import { box } from "../container/box"

export type TextareaData = {
  value: string
}

export type TextareaOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  wiring: Wiring<S, TextareaData>
}

const freshTextarea = (value: string): TextareaData => {
  return { value }
}

const textarea = <S>(options: TextareaOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, wiring, ...etc } = options
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
