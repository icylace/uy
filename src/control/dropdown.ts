import type { VDOM } from "hyperapp"
import type { Content, Control, ControlData, ControlOptions, Path } from "../types"

import cc from "classcat"
import { option, select } from "ntml"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

export type DropdownOptions = ControlOptions & {
  options: Record<string, Content>
  path: Path
}

export type DropdownData = ControlData<string> & {
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
}

export const freshDropdown = (value: string): DropdownData =>
  ({ value, focused: false })

const rawDropdown =
  ({ disabled, locked, options, path, update, ...etc }: DropdownOptions) =>
    (data: DropdownData): VDOM =>
      box ("uy-control uy-dropdown") ([
        box ({
          disabled,
          locked,
          "uy-dropdown-arrow": true,
          focus: !!data.focused,
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
              class: cc (["uy-input", { locked, disabled }, etc.class]),
            },
            // TODO:
            // - switch to using a Map object instead in order to guarantee order
            // - verify type of `x` is workable
            Object.entries (options).map (
              ([x, value]: [any, Content]) =>
                option (
                  Array.isArray (x) ? { value: x[1], ...x[0] } : { value: x },
                  value,
                ),
            ),
          ),
        ]),
      ])

export const dropdown: Control = component (rawDropdown)
