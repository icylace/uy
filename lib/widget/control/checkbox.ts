import { Action, ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { isContent } from "hyperapplicable"
import { Focus, get, set } from "eyepiece"

export type { CheckboxData, CheckboxOptions, CheckboxValue }
export { checkbox, freshCheckbox }

// -----------------------------------------------------------------------------

type CheckboxValue = boolean | null | undefined

type CheckboxData = {
  value: CheckboxValue
}

type CheckboxOptions<S> =
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]
  | RawCheckboxOptions<S>

type RawCheckboxOptions<S> = {
  label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
  updater?: Action<S, CheckboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshCheckbox = (value: CheckboxValue): CheckboxData =>
  ({ value })

const checkbox = <S>(options: CheckboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, updater, ...etc } = props
    const value = get<CheckboxData>(focus)(state).value
    return h("div", { class: ["uy-control uy-checkbox", etc.class, { disabled }] }, [
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
          class: "uy-input",
        }),
        label ? h("span", {}, label) : null,
      ]),
    ])
  }
}
