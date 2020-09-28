import type { ClassProp, Transform, VDOM } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { box } from "../container/box"

export type RadiosOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  options: Record<string, Content<S>>
  update: Transform<S>
}

export type RadiosData = {
  value: string
}

export const freshRadios = (value: string): RadiosData =>
  ({ value })

const rawRadios = <S>(props: RadiosOptions<S>, data: RadiosData): VDOM<S> => {
  const { disabled, locked, options, update, ...etc } = props
  return box("uy-control uy-radios",
    // TODO:
    // - switch to using a Map object instead in order to guarantee order
    Object.entries(options).map(
      ([value, label]: [string, Content<S>]): VDOM<S> => {
        return html.label({ class: { locked, disabled } }, [
          html.input({
            disabled,
            value,
            checked: value === data.value,
            type: "radio",
            onchange: (state, event) => {
              if (!event) return state
              const target = event.target as HTMLInputElement
              return update(state, target.value)
            },
            ...etc,
            class: cc(["uy-input", { locked, disabled }, etc.class]),
          }),
          label != null ? html.span(label) : null,
        ])
      }
    ),
  )
}

export const radios = component(rawRadios)
