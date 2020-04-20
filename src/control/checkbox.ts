import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { handleCheckedWith } from "../utility/event"
import { ifExists } from "../utility/utility"

// freshCheckbox :: Bool -> ControlData
const freshCheckbox = (value: boolean): any => ({ value })

// rawCheckbox :: LabeledControlOptions -> Object -> VNode
const rawCheckbox = ({ disabled, locked, label, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-checkbox", [
    h("label", { class: { disabled, locked } }, [
      h("input", {
        disabled,
        checked: data.value,
        type: "checkbox",
        onchange: handleCheckedWith(update),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }),
      ifExists((x: any) => h("span", {}, [x]))(label),
    ]),
  ])

// checkbox :: LabeledControlOptions -> [String] -> State -> VNode
const checkbox = component(rawCheckbox)

export { freshCheckbox, checkbox, rawCheckbox }
