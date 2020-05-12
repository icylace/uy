import { VDOM, h } from "hyperapp"
import { ControlData, ControlOptions } from "../types"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"

const freshTextarea = (value: string): ControlData<string> => ({ value })

const rawTextarea = ({ disabled, locked, update, ...etc }: ControlOptions) => (data: ControlData<string>): VDOM => {
  return box ("uy-control uy-textarea") ([
    h ("textarea", {
      disabled,
      readonly: locked,
      value: data.value,
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

// textarea :: ControlOptions -> [String] -> State -> VNode
const textarea = component (rawTextarea)

export { freshTextarea, textarea }
