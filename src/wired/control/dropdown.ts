import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../../component"

import { option, select } from "ntml"
import { box } from "../../wireless/container/box"

export type DropdownData = {
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
  value: string
}

export type DropdownChoices<S> = Record<string, Content<S>>

export type DropdownOptions<S>
  = DropdownChoices<S>
  | {
    class?: ClassProp
    disabled?: boolean
    choices: DropdownChoices<S>
  }

const freshDropdown = (value: string): DropdownData => {
  return { value, focused: false }
}

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> => {
  return typeof x === "object" && !("choices" in x)
}

const dropdown = <S>(options: DropdownOptions<S>) => (wiring: Wiring<DropdownData, S>) => (state: State<S>): VDOM<S> => {
  const props = isOnlyChoices<S>(options) ? { choices: options } : options
  const { disabled, choices, ...etc } = props
  const r = wiring.get(state)
  return box("uy-control uy-dropdown", [
    box({
      "uy-dropdown-arrow": true,
      focus: !!r.focused,
      disabled,
    }, [
      select(
        {
          value: r.value,
          disabled,
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            const r = wiring.get(state)
            return wiring.set(state, { ...r, value: target.value })
          },
          onfocus: (state) => wiring.set(state, { ...r, focused: true }),
          onblur: (state) => wiring.set(state, { ...r, focused: false }),
          ...etc,
          class: ["uy-input", { disabled }, etc.class],
        },
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        // - verify type of `x` is workable
        Object.entries(choices).map(
          ([value, label]: [string, Content<S>]): VDOM<S> => {
            return option({ value }, label)
          }
        ),
      ),
    ]),
  ])
}

export { dropdown, freshDropdown }
