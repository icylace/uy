import type { ClassProp, Payload, State, Transition, VDOM } from "hyperapp"
import type { Transform } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type TextareaOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Transform<S, string>
}

export type TextareaData = {
  value: string
}

export const freshTextarea = (value: string): TextareaData =>
  ({ value })

const rawTextarea =
  <S>({ disabled, locked, update, ...etc }: TextareaOptions<S>) =>
    (data: TextareaData): VDOM<S> =>
      box ("uy-control uy-textarea") ([
        html.textarea ({
          disabled,
          readonly: locked,
          value: data.value,
          onchange: (state: State<S>, event?: Payload<Event>): Transition<S> => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            return update (state, target.value)
          },
          ...etc,
          class: cc (["uy-input", { locked, disabled }, etc.class]),
        }),
      ])

export const textarea = component (rawTextarea)
