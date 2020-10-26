import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { Path } from "../utility/shadesHelper"

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
  path: Path
  wiring: Wiring<S, NumberboxData>
}

const freshNumberbox = (value: number): NumberboxData => {
  return { value, focused: false }
}

const sanitizedNumber = (n: string): number => {
  return Math.max(0, Number.parseInt(n, 10))
}

const numberbox = <S>(props: NumberboxOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, label, path, wiring, ...etc } = props
  const x = wiring.data(state)
  return box("uy-control uy-numberbox", [
    html.label({ class: { focus: !!x.focused, locked, disabled } }, [
      html.input({
        disabled,
        min: 0,
        readonly: locked,
        type: "number",
        value: x.value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return wiring.update(state, { focused: x.focused, value: sanitizedNumber(target.value) })
        },
        onfocus: (state) => wiring.update(state, { ...x, focused: true }),
        onblur: (state) => wiring.update(state, { ...x, focused: false }),
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
