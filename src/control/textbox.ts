import { VDOM, h } from "hyperapp"
import { ControlOptions } from "../types"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"

// freshTextbox :: String -> ControlData
const freshTextbox = (value: string): any => ({ value })

// rawTextbox :: ControlOptions -> Object -> VNode
const rawTextbox = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: any): VDOM => {
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
