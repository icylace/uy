import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { get, set } from "eyepiece"
import { h } from "hyperapp"
import { c, isContent } from "../../utility/hyperappHelper/content"
import { box } from "../container/box"

export type CheckboxValue = boolean | null | undefined

export type CheckboxData = {
  value: CheckboxValue
}

export type CheckboxOptions<S> =
  | Content<S>
  | {
    label?: Content<S>
    onchange?: Action<S, CheckboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshCheckbox = (value: CheckboxValue): CheckboxData => ({ value })

const checkbox = <S>(options: CheckboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, onchange, disabled, ...etc } = props
    const value = get<CheckboxData>(focus)(state).value
    return box("uy-control uy-checkbox", [
      h("label", { class: { disabled } }, [
        h("input", {
          type: "checkbox",
          checked: !!value,
          indeterminate: value == null,
          disabled,
          onchange: (state, event) => {
            const target = event.target as HTMLInputElement
            const nextValue = target.checked
            const nextState = set<S>(focus, "value")(nextValue)(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: ["uy-input", { disabled }, etc.class],
        }),
        label ? h("span", {}, c(label)) : null,
      ]),
    ])
  }
}

export { checkbox, freshCheckbox }
