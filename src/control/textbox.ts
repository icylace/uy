import type { VDOM } from "hyperapp"
import type { Control, ControlData, ControlOptions } from "../types"

import cc from "classcat"
import { input } from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { component } from "../component"
import { box } from "../container/box"

const freshTextbox = (value: string): ControlData<string> => ({ value })

const rawTextbox = ({ disabled, locked, update, ...etc }: ControlOptions) =>
  (data: ControlData<string>): VDOM => {
    return box ("uy-control uy-textbox") ([
      input ({
        disabled,
        readonly: locked,
        value: data.value,
        type: "text",
        onchange: handleValueWith (update),
        ...etc,
        class: cc ([{ "uy-input": true, locked, disabled }, etc.class]),
      }),
    ])
  }

const textbox: Control = component (rawTextbox)

export { freshTextbox, rawTextbox, textbox }
