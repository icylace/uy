import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import cc from "classcat"
import { option, select } from "ntml"
import { box } from "../container/box"

export type DropdownData = {
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
  value: string
}

export type DropdownOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  choices: Record<string, Content<S> | Content<S>[]>
  wiring: Wiring<S, DropdownData>
}

const freshDropdown = (value: string): DropdownData => {
  return { value, focused: false }
}

const dropdown = <S>(options: DropdownOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, choices, wiring, ...etc } = options
  const r = wiring.data(state)
  return box("uy-control uy-dropdown", [
    box({
      "uy-dropdown-arrow": true,
      focus: !!r.focused,
      disabled,
      locked,
    }, [
      select(
        {
          disabled,
          readonly: locked,
          value: r.value,
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            const r = wiring.data(state)
            return wiring.update(state, { ...r, value: target.value })
          },
          onfocus: (state) => wiring.update(state, { ...r, focused: true }),
          onblur: (state) => wiring.update(state, { ...r, focused: false }),
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
