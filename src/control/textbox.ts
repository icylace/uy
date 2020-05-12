import { VDOM, h } from "hyperapp"
import { ControlData, ControlOptions } from "../types"
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

// textbox :: ControlOptions -> [String] -> State -> VNode
const textbox = component (rawTextbox)

export { freshTextbox, rawTextbox, textbox }
