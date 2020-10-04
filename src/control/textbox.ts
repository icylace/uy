import type { ClassProp, State, Transform, VDOM } from "hyperapp"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { input } from "ntml"
// import { component } from "../component"
import { get, set } from "../utility/shadesHelper"
import { box } from "../container/box"

export type TextboxOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  update: Transform<S>
}

export type TextboxData = {
  value: string
}

// export const freshTextbox = (value: string): TextboxData => {
//   return { value }
// }

export const rawTextbox = <S>(props: TextboxOptions<S>, data: TextboxData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-textbox", [
    input({
      disabled,
      readonly: locked,
      value: data.value,
      type: "text",
      onchange: (state, event) => {
        if (!event) return state
        const target = event.target as HTMLInputElement
        return update(state, target.value)
      },
      ...etc,
      class: cc(["uy-input", { locked, disabled }, etc.class]),
    }),
  ])
}

// export const textbox = component(rawTextbox)

const textbox = <S>(options: TextboxOptions<S>) => (path: Path) => {
  return (state: State<S>): VDOM<S> => {
    const data = get(path)(state) as TextboxData
    return rawTextbox({
      ...options,
      update: (state: State<S>, value: any): State<S> => {
        return set([...path, "value"])(value)(state)
      },
    }, data)
  }
}

textbox.init = (value: string): TextboxData => {
  return { value }
}

export { textbox }
