import type { VDOM } from "hyperapp"
import type { Control, ControlData, ControlOptions } from "../types"

import cc from "classcat"
import { input } from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { component } from "../component"
import { box } from "../container/box"

export type TextboxData = ControlData<string>

export const freshTextbox = (value: string): TextboxData => ({ value })

export const rawTextbox = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: TextboxData): VDOM =>
  box ("uy-control uy-textbox") ([
    input ({
      disabled,
      readonly: locked,
      value: data.value,
      type: "text",
      onchange: handleValueWith (update),
      ...etc,
      class: cc (["uy-input", { locked, disabled }, etc.class]),
    }),
  ])

export const textbox: Control = component (rawTextbox)
