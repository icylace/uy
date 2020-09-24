import type { ClassProp, Transform, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { option, select } from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

export type DropdownOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  update: Transform<S>
  options: Record<string, Content<S> | Content<S>[]>
  path: Path
};

export type DropdownData = {
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
  value: string
}

export const freshDropdown = (value: string): DropdownData =>
  ({ value, focused: false })

const rawDropdown =
  <S>({ disabled, locked, options, path, update, ...etc }: DropdownOptions<S>) =>
    (data: DropdownData): VDOM<S> =>
      box("uy-control uy-dropdown", [
        box({
          disabled,
          locked,
          "uy-dropdown-arrow": true,
          focus: !!data.focused,
        }, [
          select(
            {
              disabled,
              readonly: locked,
              value: data.value,
              onchange: (state, event) => {
                if (!event) return state
                const target = event.target as HTMLInputElement
                return update(state, target.value)
              },
              onfocus: set([...path, "focused"])(true),
              onblur: set([...path, "focused"])(false),
              ...etc,
              class: cc(["uy-input", { locked, disabled }, etc.class]),
            },
            // TODO:
            // - switch to using a Map object instead in order to guarantee order
            // - verify type of `x` is workable
            Object.entries(options).map(
              ([value, label]: [string, Content<S> | Content<S>[]]): VDOM<S> =>
                option({ value }, label),
            ),
          ),
        ]),
      ])

export const dropdown = component(rawDropdown)
