import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/event"
import { ifExists } from "../utility/utility"

// freshRadios :: String -> ControlData
const freshRadios = (value: any): any => ({ value })

// rawRadios :: RadiosOptions -> Object -> VNode
const rawRadios = ({ disabled, locked, options, update, ...etc }: any) => (data: any): any => {
  return box ("uy-control uy-radios") (
    Object.entries (options).map (([value, label]: any) =>
      h ("label", { class: { locked, disabled } }, [
        h ("input", {
          disabled,
          value,
          checked: value === data.value,
          type: "radio",
          onchange: handleValueWith (update),
          ...etc,
          class: {
            "uy-input": true,
            locked,
            disabled,
            [etc.class]: !!etc.class,
          },
        }),
        ifExists (x => h ("span", {}, [x])) (label),
      ])
    )
  )
}

// radios :: RadiosOptions -> [String] -> State -> VNode
const radios = component (rawRadios)

export { freshRadios, radios }
