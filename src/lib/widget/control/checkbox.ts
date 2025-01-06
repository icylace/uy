import { Action, ClassProp, VNode, h } from "hyperapp"
import { Content, isContent } from "hyperapplicable"
import { Focus, get, set } from "eyepiece"
import type { Want } from "wtv"

export type { CheckboxData, CheckboxOptions, CheckboxValue }
export { checkbox, freshCheckbox }

// -----------------------------------------------------------------------------

type CheckboxValue = Want<boolean>
type CheckboxData = { value: CheckboxValue }
type CheckboxOptions<S> = Content<S> | CheckboxFullOptions<S>
type CheckboxFullOptions<S> = {
  label?: Content<S>
  updater?: Action<S, CheckboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshCheckbox = (value: CheckboxValue): CheckboxData => ({ value })

const checkbox = <S>(options: CheckboxOptions<S> = {}) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { label, disabled, updater, ...etc } = props
  const value = get<CheckboxData>(focus)(state).value
  return h("div", { class: ["uwye-control uwye-checkbox", etc.class, { disabled }] }, [
    h("label", {}, [
      h("input", {
        type: "checkbox",
        checked: !!value,
        indeterminate: value == null,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.checked
          const nextState = set(focus, "value")(nextValue)(state)
          return updater ? updater(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uwye-input",
      }),
      label ? h("span", {}, label) : null,
    ]),
  ])
}
