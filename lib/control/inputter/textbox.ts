import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"

import { get, set } from "eyepiece"
import { h } from "hyperapp"

export type TextboxValue = string

export type TextboxData = {
  value: string
}

export type TextboxOptions<S> = {
  onchange?: Action<S, TextboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshTextbox = (value: TextboxValue): TextboxData => ({ value })

const textbox = <S>(options: TextboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { onchange, disabled, ...etc } = options
    return h("div", { class: "uy-control uy-textbox" }, [
      h("input", {
        type: "text",
        value: get<TextboxData>(focus)(state).value,
        disabled,
        onchange: (state, event) => {
          const target = event.target as HTMLInputElement
          const nextValue = target.value
          const nextState = set<S>(focus, "value")(nextValue)(state)
          return onchange ? onchange(nextState, nextValue) : nextState
        },
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
    ])
  }
}

export { freshTextbox, textbox }
