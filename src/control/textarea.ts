import type { ClassProp, VDOM } from "hyperapp"
import type { Transform } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextareaOptions<S, P> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Transform<S, P>
}

export type TextareaData = {
  value: string
}

export const freshTextarea = (value: string): TextareaData =>
  ({ value })

const rawTextarea =
  <S, P>({ disabled, locked, update, ...etc }: TextareaOptions<S, P>) =>
    (data: TextareaData): VDOM<S> =>
      box ("uy-control uy-textarea") ([
        html.textarea ({
          disabled,
          readonly: locked,
          value: data.value,
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            return update (state, target.value)
          },
          ...etc,
          class: cc (["uy-input", { locked, disabled }, etc.class]),
        }),
      ])

export const textarea = component (rawTextarea)
