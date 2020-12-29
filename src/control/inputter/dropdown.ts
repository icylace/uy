import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import { option, select } from "ntml"
import { Defocus, Refocus } from "../action/helper"
import { box } from "../container/box"

export type DropdownValue = string

export type DropdownData = {
  value: DropdownValue
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
}

export type DropdownChoices<S> = Record<string, Content<S>>

export type DropdownOptions<S>
  = DropdownChoices<S>
  | {
    choices: DropdownChoices<S>
    onchange?: ActionTransform<S, DropdownValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshDropdown = (value: DropdownValue): DropdownData =>
  ({ value, focused: false })

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> =>
  typeof x === "object" && !("choices" in x)


const dropdown = <S>(options: DropdownOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = isOnlyChoices<S>(options) ? { choices: options } : options
    const { choices, onchange, disabled, ...etc } = props
    const x = get<DropdownData>(focus)(state)
    return box("uy-control uy-dropdown", [
      box({ "uy-dropdown-arrow": true, focus: x.focused, disabled }, [
        select(
          {
            value: x.value,
            disabled,
            onblur: Defocus(focus),
            onfocus: Refocus(focus),
            onchange: (state, event) => {
              if (!event) return state
              const target = event.target as HTMLInputElement
              const nextValue = target.value
              const nextState = set<State<S>>(focus, "value")(nextValue)(state)
              return onchange ? onchange(nextState, nextValue) : nextState
            },
            ...etc,
            class: ["uy-input", { disabled }, etc.class],
          },
          // TODO:
          // - switch to using a Map object instead in order to guarantee order
          // - verify type of `x` is workable
          Object.entries(choices).map(([value, label]) => option({ value }, label)),
        ),
      ]),
    ])
  }
}

export { dropdown, freshDropdown }
