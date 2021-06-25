import type { Focus } from "eyepiece"
import type { Action, ClassProp, MaybeVNode, VNode } from "hyperapp"

import { get, set } from "eyepiece"
import { h } from "hyperapp"
import { Defocus, Refocus } from "../../action/helper"

export type DropdownValue = string

export type DropdownData = {
  value: DropdownValue
  "uy-dropdown-arrow"?: boolean
  focused?: boolean
}

export type DropdownChoices<S> = Record<string, MaybeVNode<S> | readonly MaybeVNode<S>[]>

export type DropdownOptions<S> =
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
  typeof x === "object" && !("choices" in x)

const dropdown = <S>(options: DropdownOptions<S>) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isOnlyChoices<S>(options) ? { choices: options } : options
    const { choices, onchange, disabled, ...etc } = props
    const x = get<DropdownData>(focus)(state)
    return h("div", { class: "uy-control uy-dropdown" }, [
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
              const nextState = set<S>(focus, "value")(nextValue)(state)
              return onchange ? onchange(nextState, nextValue) : nextState
            },
            ...etc,
            class: ["uy-input", { disabled }, etc.class],
          },
          // TODO:
          // - switch to using a Map object instead in order to guarantee order
          // - verify type of `x` is workable
          Object.entries(choices).map(([value, label]) => h("option", { value }, label)),
        ),
      ]),
    ])
  }
}

export { dropdown, freshDropdown }
