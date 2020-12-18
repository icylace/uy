import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { isContent } from "ntml"
import { box } from "../../wireless/container/box"

export type NumberboxData = {
  focused?: boolean
  value: number
}

export type NumberboxOptions<S>
  = Content<S>
  | {
    class?: ClassProp
    disabled?: boolean
    label?: Content<S>
  }

const freshNumberbox = (value: number): NumberboxData => {
  return { value, focused: false }
}

const sanitizedNumber = (n: string): number => {
  return Math.max(0, Number.parseInt(n, 10))
}

const numberbox = <S>(options: NumberboxOptions<S> = {}) => (...focus: Focus) => (state: State<S>): VDOM<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { disabled, label, ...etc } = props
  const x = get<NumberboxData>(focus)(state)
  return box("uy-control uy-numberbox", [
    html.label({ class: { focus: !!x.focused, disabled } }, [
      html.input({
        disabled,
        min: 0,
        type: "number",
        value: x.value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return set<State<S>>(focus)({
            focused: get<NumberboxData>(focus)(state).focused,
            value: sanitizedNumber(target.value),
          })(state) ?? state
        },
        onfocus: (state) => set<State<S>>(focus, "focused")(true)(state) ?? state,
        onblur: (state) => set<State<S>>(focus, "focused")(false)(state) ?? state,
        ...etc,
        class: ["uy-input", { disabled }, etc.class],
      }),
      label != null
        ? html.span({ class: { "uy-input": true, disabled } }, label)
        : null,
    ]),
  ])
}

export { freshNumberbox, numberbox }
