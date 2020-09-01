import type { VDOM } from "hyperapp"
import type { Control, ControlData, ControlOptions } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { component } from "../component"
import { box } from "../container/box"

export type TextareaOptions = ControlOptions

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
          onchange: handleValueWith (update),
          ...etc,
          class: cc (["uy-input", { locked, disabled }, etc.class]),
        }),
      ])

export const textarea: Control = component (rawTextarea)
