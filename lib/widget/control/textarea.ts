import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"

import { get, set } from "eyepiece"
import { h } from "hyperapp"

export type TextareaValue = string

export type TextareaData = {
  value: TextareaValue
}

export type TextareaOptions<S> = {
  onchange?: Action<S, TextareaValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextarea = (value: TextareaValue): TextareaData => ({ value })

const textarea = <S>(options: TextareaOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: [etc.class ?? "uy-control uy-textarea", { disabled }] }, [
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

export { freshTextarea, textarea }
