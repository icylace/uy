import type { ClassProp, State, Transition, VDOM } from "hyperapp"
import type { Transform } from "../types"

import cc from "classcat"
import { input } from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextboxOptions<S> = {
  [_: string]: unknown
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

export const rawTextbox =
  <S>({ disabled, locked, update, ...etc }: TextboxOptions<S>) =>
    (data: TextboxData): VDOM<S> =>
    box ("uy-control uy-textbox") ([
      input ({
        disabled,
        readonly: locked,
        value: data.value,
        type: "text",
        onchange: (state: State<S>, event?: Event): Transition<S> => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return update (state, target.value)
        },
        ...etc,
        class: cc (["uy-input", { locked, disabled }, etc.class]),
      }),
    ])

export const textbox = component (rawTextbox)
