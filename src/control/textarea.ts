import type { ClassProp, VDOM, Transform } from "hyperapp"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextareaOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  update: Transform<S>
}

export type TextareaData = {
  value: string
}

export const freshTextarea = (value: string): TextareaData =>
  ({ value })

const rawTextarea = <S>(props: TextareaOptions<S>, data: TextareaData): VDOM<S> => {
  const { disabled, locked, update, ...etc } = props
  return box("uy-control uy-textarea", [
    html.textarea({
      disabled,
      readonly: locked,
      value: data.value,
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

export const textarea = component(rawTextarea)
