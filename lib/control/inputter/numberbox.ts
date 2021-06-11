import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { get, set } from "eyepiece"
import { h } from "hyperapp"
import { c, isContent } from "../../utility/hyperappHelper/content"
import { Defocus, Refocus } from "../action/helper"
import { box } from "../container/box"

export type NumberboxValue = number

export type NumberboxData = {
  focused?: boolean
  value: NumberboxValue
}

export type NumberboxOptions<S> =
  | Content<S>
  | {
    label?: Content<S>
    onchange?: Action<S, NumberboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshNumberbox = (value: NumberboxValue): NumberboxData =>
  ({ value, focused: false })

const sanitizedNumber = (n: string): number =>
  Math.max(0, Number.parseInt(n, 10))

const numberbox = <S>(options: NumberboxOptions<S> = {}) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, onchange, disabled, ...etc } = props
    const x = get<NumberboxData>(focus)(state)
    return box("uy-control uy-numberbox", [
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
            const nextState = set<S>(focus)({
              focused: get<NumberboxData>(focus)(state).focused,
              value: nextValue,
            })(state)
            return onchange ? onchange(nextState, nextValue) : nextState
          },
          ...etc,
          class: ["uy-input", { disabled }, etc.class],
        }),
        label != null
          ? h("span", { class: { "uy-input": true, disabled } }, c(label))
          : null,
      ]),
    ])
  }
}

export { freshNumberbox, numberbox }
