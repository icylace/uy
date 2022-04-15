import { Action, ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { Focus, get, set } from "eyepiece"
import { isContent } from "../../utility/hyperappHelper/content"

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
  | {
    label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
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
            const nextState = set<S>(focus, "value")(nextValue)(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: "uy-input",
        }),
        label ? h("span", {}, label) : null,
      ]),
    ])
  }
}
