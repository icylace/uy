import type { VDOM } from "hyperapp"
import type { Control, ControlData, RadiosOptions } from "../types"

import * as html from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { component } from "../component"
import { box } from "../container/ui"

const freshRadios = (value: string): ControlData<string> => ({ value })

const rawRadios = (
  { disabled, locked, options, update, ...etc }: RadiosOptions,
) =>
  (data: ControlData<string>): VDOM => {
    return box ("uy-control uy-radios") (
      // TODO:
      // - switch to using a Map object instead in order to guarantee order
      Object.entries (options).map (([value, label]: any) =>
        html.label ({ class: { locked, disabled } }, [
          html.input ({
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
          label != null ? html.span (label) : null,
        ]),
      ),
    )
  }

const radios: Control = component (rawRadios)

export { freshRadios, radios }
