import type { ClassProp, State, Transform, VDOM } from "hyperapp"
// import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { input } from "ntml"
// import { get, set } from "../utility/shadesHelper"
import { box } from "../container/box"

export type TextboxOptions = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  // update: Transform<S>
}

export type TextboxData = {
  value: string
}

const init = (value: string): TextboxData => {
  return { value }
}

const restate = (getter, setter) => (f) => (state) => setter(state, f(getter(state)))

// getter: (state) => get(path)(state) as TextboxData,
// setter: (state, value) => set(path)(value)(state),

export type TextboxSettings<S> = {
  getter: (state: State<S>) => TextboxData
  setter: (state: State<S>, value: TextboxData["value"]) => State<S>
  // TODO:
  // - `update` probably not needed for textboxes since it should just be `identity`
  // update: Transform<S>
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

const wire = <S>(settings: TextboxSettings<S>): TextboxWiring<S> => {
  const { getter, setter } = settings
  const mod = restate(getter, setter)
  const update = mod(settings.update)
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

// const textbox = <S>(options: TextboxOptions<S>) => (path: Path) => {
//   return (state: State<S>): VDOM<S> => {
//     const data = get(path)(state) as TextboxData
//     return rawTextbox({
//       ...options,
//       update: (state: State<S>, value: any): State<S> => {
//         return set([...path, "value"])(value)(state)
//       },
//     }, data)
//   }
// }

Textbox.init = init
Textbox.wire = wire

export { Textbox }
