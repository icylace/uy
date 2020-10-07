import type { ClassProp, State, VDOM } from "hyperapp"

import cc from "classcat"
import { input } from "ntml"
import { box } from "../container/box"

export type TextboxOptions = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}

export type TextboxData = {
  value: string
}

export type TextboxWiring<S> = {
  getter: (state: State<S>) => TextboxData
  setter: (state: State<S>, value: TextboxData["value"]) => State<S>
}

export type TextboxModel<S> = {
  data: (state: State<S>) => TextboxData
  update: (state: State<S>, value: string) => State<S>
}

const Textbox = <S>(options: TextboxOptions, model: TextboxModel<S>) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, locked, ...etc } = options
    return box("uy-control uy-textbox", [
      input({
        disabled,
        readonly: locked,
        type: "text",
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

Textbox.init = (value: string): TextboxData => {
  return { value }
}

Textbox.wire = <S>(wiring: TextboxWiring<S>): TextboxModel<S> => {
  const { getter, setter } = wiring
  // const mod = (f) => (state) => setter(state, f(getter(state)))
  // const update = mod(wiring.update)
  return {
    data: getter,
    update: setter,
  }
}


export { Textbox }
