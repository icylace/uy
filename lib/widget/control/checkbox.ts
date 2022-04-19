import { Action, ClassProp, EventActions, MaybeVNode, VNode, h } from "hyperapp"
import { isContent, next } from "hyperapplicable"
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
  | {
    label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
    onchange?: EventActions<S>["onchange"]
    // onchange?: Action<S, CheckboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshCheckbox = (value: CheckboxValue): CheckboxData => ({ value })

const rawCheckbox = <S>(options: CheckboxOptions<S>) => (onchange: Action<S, Event>) => (value: CheckboxValue): VNode<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { label, disabled, ...etc } = props
  return h("div", { class: ["uy-control uy-checkbox", etc.class, { disabled }] }, [
    h("label", {}, [
      h("input", {
        type: "checkbox",
        checked: !!value,
        indeterminate: value == null,
        disabled,
        onchange,
        ...etc,
        class: "uy-input",
      }),
      label ? h("span", {}, label) : null,
    ]),
  ])
}

const checkbox = <S>(options: CheckboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? {} : options
    const { onchange } = props
    const updater: Action<S, Event> = (state, event) => {
      const target = event.target as HTMLInputElement
      const nextValue = target.checked
      const nextState = set(focus, "value")(nextValue)(state)
      return onchange
        ? [
          nextState,
          next<S>(
            Array.isArray(onchange)
              ? [onchange[0], [...onchange.slice(1), nextValue]]
              : [onchange, nextValue]
          ),
        ]
        : nextState
    }
    return rawCheckbox<S>(options)(updater)(get<CheckboxData>(focus)(state).value)
  }
}
