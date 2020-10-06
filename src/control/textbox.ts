import type { ClassProp, State, Transform, VDOM } from "hyperapp"

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

export type TextboxSettings<S> = {
  getter: (state: State<S>) => TextboxData
  setter: (state: State<S>, value: TextboxData["value"]) => State<S>
}

export type TextboxModel<S> = {
  data: TextboxData
  update: Transform<S>
}

export type TextboxWiring<S> = {
  data: (state: State<S>) => TextboxData
  update: (state: State<S>, value: string) => State<S>
  model: (state: State<S>) => TextboxModel<S>
}

const Textbox = <S>(options: TextboxOptions, model: TextboxModel<S>): VDOM<S> => {
  const { disabled, locked, ...etc } = options
  return box("uy-control uy-textbox", [
    input({
      disabled,
      readonly: locked,
      type: "text",
      value: model.data.value,
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

Textbox.init = (value: string): TextboxData => {
  return { value }
}

// const restate = (getter, setter) => (f) => (state) => setter(state, f(getter(state)))

Textbox.wire = <S>(settings: TextboxSettings<S>): TextboxWiring<S> => {
  const { getter, setter } = settings
  // const mod = restate(getter, setter)
  // const update = mod(settings.update)
  return {
    update: setter,
    data: getter,
    model: (state) => ({
      // update,
      update: setter,
      data: getter(state),
    }),
  }
}


export { Textbox }
