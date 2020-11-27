import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import * as html from "ntml"
import { isContent } from "ntml"
import { box } from "../container/box"

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

const numberbox = <S>(options: NumberboxOptions<S> = {}) => (wiring: Wiring<NumberboxData, S>) => (state: State<S>): VDOM<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { disabled, label, ...etc } = props
  const r = wiring.get(state)
  return box("uy-control uy-numberbox", [
    html.label({ class: { focus: !!r.focused, disabled } }, [
      html.input({
        disabled,
        min: 0,
        type: "number",
        value: r.value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return wiring.set(state, {
            focused: wiring.get(state).focused,
            value: sanitizedNumber(target.value),
          })
        },
        onfocus: (state) => wiring.set(state, { ...wiring.get(state), focused: true }),
        onblur: (state) => wiring.set(state, { ...wiring.get(state), focused: false }),
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
