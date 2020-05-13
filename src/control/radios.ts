import type { VDOM } from "hyperapp"
import type { Control, ControlData, RadiosOptions } from "../types"

import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"

const freshRadios = (value: string): ControlData<string> => ({ value })

const rawRadios = ({ disabled, locked, options, update, ...etc }: RadiosOptions) => (data: ControlData<string>): VDOM => {
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

const radios: Control = component (rawRadios)

export { freshRadios, radios }
