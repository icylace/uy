import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import cc from "classcat"
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
  locked?: boolean
  wiring: Wiring<S, NumberboxData>
}

const freshNumberbox = (value: number): NumberboxData => {
  return { value, focused: false }
}

const sanitizedNumber = (n: string): number => {
  return Math.max(0, Number.parseInt(n, 10))
}

const numberbox = <S>(options: NumberboxOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, label, wiring, ...etc } = options
  const r = wiring.data(state)
  return box("uy-control uy-numberbox", [
    html.label({ class: { focus: !!r.focused, locked, disabled } }, [
      html.input({
        disabled,
        min: 0,
        readonly: locked,
        type: "number",
        value: r.value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return wiring.update(state, {
            focused: wiring.data(state).focused,
            value: sanitizedNumber(target.value),
          })
        },
        onfocus: (state) => wiring.update(state, { ...wiring.data(state), focused: true }),
        onblur: (state) => wiring.update(state, { ...wiring.data(state), focused: false }),
        ...etc,
        class: cc(["uy-input", { locked, disabled }, etc.class]),
      }),
      label != null
        ? html.span({ class: { "uy-input": true, locked, disabled } }, label)
        : null,
    ]),
  ])
}

export { freshNumberbox, numberbox }
