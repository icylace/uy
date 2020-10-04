import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import * as html from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { box } from "../container/box"

export type NumberboxOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  label?: Content<S>
  locked?: boolean
  path: Path
}

export type NumberboxData = {
  focused?: boolean
  value: number
}

export const freshNumberbox = (value: number): NumberboxData => {
  return { value, focused: false }
}

const sanitizedNumber = (n: string): number => {
  return Math.max(0, Number.parseInt(n, 10))
}

const update = (path: Path) => {
  return <S>(state: State<S>, value: string): State<S> => {
    return set([...path, "value"])(sanitizedNumber(value))(state)
  }
}

const rawNumberbox = <S>(props: NumberboxOptions<S>, data: NumberboxData): VDOM<S> => {
  const { disabled, locked, label, path, ...etc } = props
  return box("uy-control uy-numberbox", [
    html.label({ class: { focus: !!data.focused, locked, disabled } }, [
      html.input({
        disabled,
        min: 0,
        readonly: locked,
        type: "number",
        value: data.value,
        onchange: (state, event) => {
          if (!event) return state
          const target = event.target as HTMLInputElement
          return update(path)(state, target.value)
        },
        onfocus: set([...path, "focused"])(true),
        onblur: set([...path, "focused"])(false),
        ...etc,
        class: cc(["uy-input", { locked, disabled }, etc.class]),
      }),
      label != null
        ? html.span({ class: { "uy-input": true, locked, disabled } }, label)
        : null,
    ]),
  ])
}

export const numberbox = component(rawNumberbox)
