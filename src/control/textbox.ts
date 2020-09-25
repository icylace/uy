import type { ClassProp, Transform, VDOM } from "hyperapp"

import cc from "classcat"
import { input } from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextboxOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Transform<S>
}

export type TextboxData = {
  value: string
}

export const freshTextbox = (value: string): TextboxData =>
  ({ value })

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

export const textbox = component(rawTextbox)
