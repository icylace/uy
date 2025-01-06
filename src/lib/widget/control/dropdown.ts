import { Action, ClassProp, VNode, h } from "hyperapp"
import type { Content } from "hyperapplicable"
import { Focus, get, set } from "eyepiece"
import { Defocus, Refocus } from "../../action/helper"

export type { DropdownChoices, DropdownData, DropdownOptions, DropdownValue }
export { dropdown, freshDropdown }

// -----------------------------------------------------------------------------

type DropdownValue = string
type DropdownData = {
  value: DropdownValue
  "uwye-dropdown-arrow"?: boolean
  focused?: boolean
}
type DropdownChoices<S> = Record<string, Content<S>>
type DropdownOptions<S> = DropdownChoices<S> | DropdownFullOptions<S>
type DropdownFullOptions<S> = {
  choices: DropdownChoices<S>
  onchange?: Action<S, DropdownValue>
  class?: ClassProp
  disabled?: boolean
}

const freshDropdown = (value: DropdownValue): DropdownData =>
  ({ value, focused: false })

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> =>
  x != null && typeof x === "object" && !("choices" in x)

const dropdown = <S>(options: DropdownOptions<S>) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = isOnlyChoices<S>(options) ? { choices: options } : options
  const { choices, onchange, disabled, ...etc } = props
  const x = get<DropdownData>(focus)(state)
  return h("div", { class: ["uwye-control uwye-dropdown", etc.class, { disabled }] }, [
    h("div", { class: { "uwye-dropdown-arrow": true, focus: x.focused, disabled } }, [
      h("select",
        {
          value: x.value,
          disabled,
          onblur: Defocus(focus),
          onfocus: Refocus(focus),
          onchange: (state, event) => {
            const target = event.target as HTMLInputElement
            const nextValue = target.value
            const nextState = set(focus, "value")(nextValue)(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: "uwye-input",
        },
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        // - verify type of `x` is workable
        Object.entries(choices).map(
          ([value, label]) => h("option", { value }, label)
        ),
      ),
    ]),
  ])
}
