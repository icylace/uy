import { Action, ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { Focus, get, set } from "eyepiece"
import { Defocus, Refocus } from "../../action/helper"

export type { DropdownChoices, DropdownData, DropdownOptions, DropdownValue }
export { dropdown, freshDropdown }

// -----------------------------------------------------------------------------

type DropdownValue = string

type DropdownData = {
  value: DropdownValue
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
}

type DropdownChoices<S> =
  | Record<string, MaybeVNode<S>
  | readonly MaybeVNode<S>[]>

type DropdownOptions<S> =
  | DropdownChoices<S>
  | {
    choices: DropdownChoices<S>
    onchange?: Action<S, DropdownValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshDropdown = (value: DropdownValue): DropdownData =>
  ({ value, focused: false })

const isOnlyChoices = <S>(x: any): x is Record<string, MaybeVNode<S> | readonly MaybeVNode<S>[]> =>
  x != null && typeof x === "object" && !("choices" in x)

const dropdown = <S>(options: DropdownOptions<S>) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = isOnlyChoices<S>(options) ? { choices: options } : options
  const { choices, onchange, disabled, ...etc } = props
  const x = get<DropdownData>(focus)(state)
  return h("div", { class: ["uy-control uy-dropdown", etc.class, { disabled }] }, [
    h("div", { class: { "uy-dropdown-arrow": true, focus: x.focused, disabled } }, [
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
          class: "uy-input",
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
