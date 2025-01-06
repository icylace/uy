import { Action, ClassProp, VNode, h } from "hyperapp"
import { Focus, get, set } from "eyepiece"

export type { TextboxData, TextboxOptions, TextboxValue }
export { freshTextbox, textbox }

// -----------------------------------------------------------------------------

type TextboxValue = string
type TextboxData = { value: string }
type TextboxOptions<S> = {
  onchange?: Action<S, TextboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextbox = (value: TextboxValue): TextboxData => ({ value })

const textbox = <S>(options: TextboxOptions<S> = {}) => (...focus: Focus) => (state: S): VNode<S> => {
  const { onchange, disabled, ...etc } = options
  return h("div", { class: ["uwye-control uwye-textbox", etc.class, { disabled }] }, [
    h("input", {
      type: "text",
      value: get<TextboxData>(focus)(state).value,
      disabled,
      onchange: (state, event) => {
        const target = event.target as HTMLInputElement
        const nextValue = target.value
        const nextState = set(focus, "value")(nextValue)(state)
        return onchange ? onchange(nextState, nextValue) : nextState
      },
      ...etc,
      class: "uwye-input",
    }),
  ])
}
