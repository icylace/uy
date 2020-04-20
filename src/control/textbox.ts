import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { handleValueWith } from "../utility/event"

// freshTextbox :: String -> ControlData
const freshTextbox = (value: string): any => ({ value })

// rawTextbox :: ControlOptions -> Object -> VNode
const rawTextbox = ({ disabled, locked, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-textbox")([
    h("input", {
      disabled,
      readonly: locked,
      value: data.value,
      type: "text",
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

// textbox :: ControlOptions -> [String] -> State -> VNode
const textbox = component(rawTextbox)

export { freshTextbox, rawTextbox, textbox }
