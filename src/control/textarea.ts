import type { ClassProp, VDOM } from "hyperapp"
import type { Control, ControlData, Handler } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextareaOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Handler
}

export type TextareaData = ControlData<string>

export const freshTextarea = (value: string): TextareaData => ({ value })

const rawTextarea =
  ({ disabled, locked, update, ...etc }: TextareaOptions) =>
    (data: TextareaData): VDOM =>
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

export const textarea: Control = component (rawTextarea)
