import { VDOM, h } from "hyperapp"
import { ControlData, RadiosOptions } from "../types"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"

// freshRadios :: String -> ControlData
const freshRadios = (value: any): ControlData<any> => ({ value })

const rawRadios = ({ disabled, locked, options, update, ...etc }: RadiosOptions) => (data: ControlData<any>): VDOM => {
  return box ("uy-control uy-radios") (
      // TODO:
      // - switch to using a Map object instead in order to guarantee order
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
        label != null ? h ("span", {}, [label]) : null,
      ])
    )
  )
}

// radios :: RadiosOptions -> [String] -> State -> VNode
const radios = component (rawRadios)

export { freshRadios, radios }
