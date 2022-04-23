import { Action, ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { isContent } from "hyperapplicable"
import { Focus, get, set } from "eyepiece"
import { Defocus, Refocus } from "../../action/helper"

export type { NumberboxData, NumberboxOptions, NumberboxValue }
export { freshNumberbox, numberbox }

// -----------------------------------------------------------------------------

type NumberboxValue = number

type NumberboxData = {
  focused?: boolean
  value: NumberboxValue
}

type NumberboxOptions<S> =
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]
  | {
    label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
    onchange?: Action<S, NumberboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshNumberbox = (value: NumberboxValue): NumberboxData =>
  ({ value, focused: false })

const sanitizedNumber = (n: string): number =>
  Math.max(0, Number.parseInt(n, 10))

const numberbox = <S>(options: NumberboxOptions<S> = {}) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { label, onchange, disabled, ...etc } = props
  const x = get<NumberboxData>(focus)(state)
  return h("div", { class: ["uy-control uy-numberbox", etc.class, { disabled }] }, [
    h("label", { class: { focus: x.focused, disabled } }, [
      h("input", {
        type: "number",
        min: 0,
        value: x.value,
        disabled,
        onblur: Defocus(focus),
        onfocus: Refocus(focus),
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = sanitizedNumber(target.value)
          const nextState = set(focus)({
            focused: get<NumberboxData>(focus)(state).focused,
            value: nextValue,
          })(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
      label != null
        ? h("span", { class: "uy-input" }, label)
        : null,
    ]),
  ])
}
