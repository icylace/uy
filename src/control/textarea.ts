import type { ClassProp, State, VDOM } from "hyperapp"

import cc from "classcat"
import * as html from "ntml"
import { box } from "../container/box"

export type TextareaOptions = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}

export type TextareaData = {
  value: string
}

export type TextareaWiring<S> = {
  getter: (state: State<S>) => TextareaData
  setter: (state: State<S>, value: TextareaData["value"]) => State<S>
}

export type TextareaModel<S> = {
  data: (state: State<S>) => TextareaData
  update: (state: State<S>, value: string) => State<S>
}

const Textarea = <S>(options: TextareaOptions, model: TextareaModel<S>) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, locked, ...etc } = options
    return box("uy-control uy-textarea", [
      html.textarea({
        disabled,
        readonly: locked,
        value: model.data(state).value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return model.update(state, target.value)
        },
        ...etc,
        class: cc(["uy-input", { locked, disabled }, etc.class]),
      }),
    ])
  }
}

Textarea.init = (value: string): TextareaData => {
  return { value }
}

Textarea.wire = <S>(wiring: TextareaWiring<S>): TextareaModel<S> => {
  const { getter, setter } = wiring
  // const mod = (f) => (state) => setter(state, f(getter(state)))
  // const update = mod(wiring.update)
  return {
    data: getter,
    update: setter,
  }
}

export { Textarea }
