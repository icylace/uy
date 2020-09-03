import type { ClassProp, VDOM } from "hyperapp"
import type { Control, ControlData, Handler } from "../types"

import cc from "classcat"
import { input } from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextboxOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Handler
}

export type TextboxData = ControlData<string>

export const freshTextbox = (value: string): TextboxData =>
  ({ value })

export const rawTextbox =
  ({ disabled, locked, update, ...etc }: TextboxOptions) =>
    (data: TextboxData): VDOM =>
      box ("uy-control uy-textbox") ([
        input ({
          disabled,
          readonly: locked,
          value: data.value,
          type: "text",
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            return update (state, target.value)
          },
          ...etc,
          class: cc (["uy-input", { locked, disabled }, etc.class]),
        }),
      ])

export const textbox: Control = component (rawTextbox)
