import { h } from "hyperapp"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/event"
import { component } from "../utility/component"

// freshTextbox :: String -> ControlData
const freshTextarea = (value: string): any => ({ value })

// rawTextarea :: ControlOptions -> Object -> VNode
const rawTextarea = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-textarea")([
    h("textarea", {
      disabled,
      readonly: locked,
      value: data.value,
      onchange: handleValueWith(update),
      ...etc,
      class: {
        disabled,
        locked,
        "uy-input": true,
        [etc.class]: !!etc.class,
      },
    }),
  ])

// textarea :: ControlOptions -> [String] -> State -> VNode
const textarea = component(rawTextarea)

export { freshTextarea, textarea }
