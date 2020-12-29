import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { isContent } from "ntml"
import { Blur, Ogle } from "../action/helper"
import { box } from "../container/box"

export type NumberboxValue = number

export type NumberboxData = {
  focused?: boolean
  value: NumberboxValue
}

export type NumberboxOptions<S>
  = Content<S>
  | {
    label?: Content<S>
    onchange?: ActionTransform<S, NumberboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshNumberbox = (value: NumberboxValue): NumberboxData =>
  ({ value, focused: false })

const sanitizedNumber = (n: string): number =>
  Math.max(0, Number.parseInt(n, 10))

const numberbox = <S>(options: NumberboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, onchange, disabled, ...etc } = props
    const x = get<NumberboxData>(focus)(state)
    return box("uy-control uy-numberbox", [
      html.label({ class: { focus: x.focused, disabled } }, [
        html.input({
          type: "number",
          min: 0,
          value: x.value,
          disabled,
          onblur: Blur(focus),
          onfocus: Ogle(focus),
          onchange: (state, event) => {
            if (!event) return state
            const target = event.target as HTMLInputElement
            const nextValue = sanitizedNumber(target.value)
            const nextState = set<State<S>>(focus)({
              focused: get<NumberboxData>(focus)(state).focused,
              value: nextValue,
            })(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: ["uy-input", { disabled }, etc.class],
        }),
        label != null
          ? html.span({ class: { "uy-input": true, disabled } }, label)
          : null,
      ]),
    ])
  }
}

export { freshNumberbox, numberbox }
