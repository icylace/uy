import type { ClassProp, State, Transform, VDOM } from "hyperapp"
// import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { input } from "ntml"
// import { component } from "../component"
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

// export const freshTextbox = (value: string): TextboxData => {
//   return { value }
// }

const init = (value: string): TextboxData => {
  return { value }
}

// const restate = (get, set) => (f) => (state) => set(state, f(get(state)))

// get: (state) => get(path)(state) as TextboxData,
// set: (state, value) => set(path)(value)(state),

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
  // const mod = restate(settings.getter, settings.setter)
  // const update = mod(settings.update)
  return {
    update: settings.setter,
    data: settings.getter,
    model: (state) => ({
      // update,
      update: settings.setter,
      data: settings.getter(state),
    }),
  }
}

// TODO:
// - `textbox` -> `Textbox`
//   - components (things that need wiring) should be capitalized

const textbox = <S>(options: TextboxOptions, model: TextboxModel<S>): VDOM<S> => {
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

// export const rawTextbox = <S>(model: TextboxModel<S>): VDOM<S> => {
//   const { disabled, locked, update, ...etc } = model.props
//   return box("uy-control uy-textbox", [
//     input({
//       disabled,
//       readonly: locked,
//       value: model.data.value,
//       type: "text",
//       onchange: (state, event) => {
//         if (!event) return state
//         const target = event.target as HTMLInputElement
//         return update(state, target.value)
//       },
//       ...etc,
//       class: cc(["uy-input", { locked, disabled }, etc.class]),
//     }),
//   ])
// }

// export const textbox = component(rawTextbox)

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

textbox.init = init
textbox.wire = wire

export { textbox }
