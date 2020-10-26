import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { option, select } from "ntml"
import { set } from "../utility/shadesHelper"
import { box } from "../container/box"

export type DropdownData = {
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
  value: string
}

export type DropdownSettings<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  choices: Record<string, Content<S> | Content<S>[]>
  path: Path
  wiring: Wiring<S, DropdownData>
}

const freshDropdown = (value: string): DropdownData => {
  return { value, focused: false }
}

const dropdown = <S>(options: DropdownSettings<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, choices, path, wiring, ...etc } = options
  const x = wiring.data(state)
  return box("uy-control uy-dropdown", [
    box({
      disabled,
      locked,
      "uy-dropdown-arrow": true,
      focus: !!x.focused,
    }, [
      select(
        {
          disabled,
          readonly: locked,
          value: x.value,
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            return wiring.update(state, freshDropdown(target.value))
          },
          onfocus: (state) => wiring.update(state, { ...x, focused: true }),
          onblur: (state) => wiring.update(state, { ...x, focused: false }),
          ...etc,
          class: cc(["uy-input", { locked, disabled }, etc.class]),
        },
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        // - verify type of `x` is workable
        Object.entries(choices).map(
          ([value, label]: [string, Content<S> | Content<S>[]]): VDOM<S> => {
            return option({ value }, label)
          }
        ),
      ),
    ]),
  ])
}

export { dropdown, freshDropdown }
