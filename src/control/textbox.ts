import type { VDOM } from "hyperapp"
import type { Control, ControlData, ControlOptions } from "../types"

import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"

const freshTextbox = (value: string): ControlData<string> => ({ value })

const rawTextbox = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-textbox") ([
    h ("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "text",
      onchange: handleValueWith (update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: !!etc.class,
      },
    }),
  ])
}

const textbox: Control = component (rawTextbox)

export { freshTextbox, rawTextbox, textbox }
