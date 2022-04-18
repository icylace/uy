import { Action, ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { Focus, get, set } from "eyepiece"

export type { RadiosChoices, RadiosData, RadiosOptions, RadiosValue }
export { freshRadios, radios }

// -----------------------------------------------------------------------------

type RadiosValue = string

type RadiosData = {
  value: RadiosValue
}

type RadiosChoices<S> =
  | Record<string, MaybeVNode<S>
  | readonly MaybeVNode<S>[]>

type RadiosOptions<S> =
  | RadiosChoices<S>
  | {
    choices: RadiosChoices<S>
    onchange?: Action<S, RadiosValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshRadios = (value: RadiosValue): RadiosData => ({ value })

const isOnlyChoices = <S>(x: any): x is Record<string, MaybeVNode<S> | readonly MaybeVNode<S>[]> =>
  typeof x === "object" && !("choices" in x)

const radios = <S>(options: RadiosOptions<S>) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isOnlyChoices<S>(options) ? { choices: options } : options
    const { choices, onchange, disabled, ...etc } = props
    return h("div", { class: ["uy-control uy-radios", etc.class, { disabled }] },
      // TODO:
      // - switch to using a Map object instead in order to guarantee order
      Object.entries(choices).map(
        ([value, label]: [string, MaybeVNode<S> | readonly MaybeVNode<S>[]]): VNode<S> => {
          return h("label", { class: { disabled } }, [
            h("input", {
              value,
              checked: value === get<RadiosData>(focus)(state).value,
              type: "radio",
              disabled,
              onchange: (state, event) => {
                const target = event.target as HTMLInputElement
                const nextValue = target.value
                const nextState = set(focus, "value")(nextValue)(state)
                return onchange ? onchange(nextState, nextValue) : nextState
              },
              ...etc,
              class: "uy-input",
            }),
            label != null ? h("span", {}, label) : null,
          ])
        }
      ),
    )
  }
}
