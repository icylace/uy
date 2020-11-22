import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import * as html from "ntml"
import { box } from "../container/box"

export type NumberboxData = {
  focused?: boolean
  value: number
}

export type NumberboxOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: Content<S>
  wiring: Wiring<S, NumberboxData>
}

const freshNumberbox = (value: number): NumberboxData => {
  return { value, focused: false }
}

const sanitizedNumber = (n: string): number => {
  return Math.max(0, Number.parseInt(n, 10))
}

const numberbox = <S>(options: NumberboxOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, label, wiring, ...etc } = options
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
