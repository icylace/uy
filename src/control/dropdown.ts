import type { VDOM } from "hyperapp"
import type { Control, ControlData, DropdownOptions } from "../types"

import { option, select } from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

const freshDropdown = (value: string): ControlData<string> => {
  return { value, focused: false }
}

const rawDropdown = (
  { disabled, locked, options, path, update, ...etc }: DropdownOptions,
) =>
  (data: ControlData<string>): VDOM => {
    return box ("uy-control uy-dropdown") ([
      box ({
        disabled,
        locked,
        "uy-dropdown-arrow": true,
        focus: data.focused,
      }) ([
        select (
          {
            disabled,
            readonly: locked,
            value: data.value,
            onchange: handleValueWith (update),
            onfocus: set ([...path, "focused"]) (true),
            onblur: set ([...path, "focused"]) (false),
            ...etc,
            class: {
              disabled,
              locked,
              "uy-input": true,
              [etc.class]: !!etc.class,
            },
          },
          // TODO:
          // - switch to using a Map object instead in order to guarantee order
          Object.entries (options).map (
            ([x, value]: [any, any]) =>
              option (
                Array.isArray (x) ? { value: x[1], ...x[0] } : { value: x },
                value,
              ),
          ),
        ),
      ]),
    ])
  }

const dropdown: Control = component (rawDropdown)

export { freshDropdown, dropdown }
