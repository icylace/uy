import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { handleValueWith } from "../utility/event"
import { ifExists } from "../utility/utility"

// freshRadios :: String -> ControlData
const freshRadios = (value: any) => ({ value })

// rawRadios :: RadiosOptions -> Object -> VNode
const rawRadios = ({ disabled, locked, options, update, ...etc }: any) => (data: any) =>
  box("uy-control uy-radios")(
    Object.entries(options).map(([value, label]: any) =>
      h("label", { class: { locked, disabled } }, [
        h("input", {
          disabled,
          value,
          checked: value === data.value,
          type: "radio",
          onchange: handleValueWith(update),
          ...etc,
          class: {
            "uy-input": true,
            locked,
            disabled,
            [etc.class]: !!etc.class,
          },
        }),
        ifExists((x: any) => h("span", {}, [x]))(label),
      ])
    ))

// radios :: RadiosOptions -> [String] -> State -> VNode
const radios = component(rawRadios)

export { freshRadios, radios }
