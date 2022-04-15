import { Action, ClassProp, VNode, h } from "hyperapp"
import { Focus, get, set } from "eyepiece"

export type { TextareaData, TextareaOptions, TextareaValue }
export { freshTextarea, textarea }

// -----------------------------------------------------------------------------

type TextareaValue = string

type TextareaData = {
  value: TextareaValue
}

type TextareaOptions<S> = {
  onchange?: Action<S, TextareaValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextarea = (value: TextareaValue): TextareaData => ({ value })

const textarea = <S>(options: TextareaOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: ["uy-control uy-textarea", etc.class, { disabled }] }, [
      h("textarea", {
        value: get<TextareaData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: "uy-input",
      }),
    ])
  }
}
