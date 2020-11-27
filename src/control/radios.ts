import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import * as html from "ntml"
import { box } from "../container/box"

export type RadiosData = {
  value: string
}

export type RadiosChoices<S> = Record<string, Content<S>>

export type RadiosOptions<S>
  = RadiosChoices<S>
  | {
    class?: ClassProp
    disabled?: boolean
    choices: RadiosChoices<S>
  }

const freshRadios = (value: string): RadiosData => {
  return { value }
}

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> => {
  return typeof x === "object" && !("choices" in x)
}

const radios = <S>(options: RadiosOptions<S>) => (wiring: Wiring<RadiosData, S>) => (state: State<S>): VDOM<S> => {
  const props = isOnlyChoices<S>(options) ? { choices: options } : options
  const { disabled, choices, ...etc } = props
  return box("uy-control uy-radios",
    // TODO:
    // - switch to using a Map object instead in order to guarantee order
    Object.entries(choices).map(
      ([value, label]: [string, Content<S>]): VDOM<S> => {
        return html.label({ class: { disabled } }, [
          html.input({
            disabled,
            value,
            checked: value === wiring.get(state).value,
            type: "radio",
            onchange: (state, event) => {
              if (!event) return state
              const target = event.target as HTMLInputElement
              return wiring.set(state, { value: target.value })
            },
            ...etc,
            class: ["uy-input", { disabled }, etc.class],
          }),
          label != null ? html.span(label) : null,
        ])
      }
    ),
  )
}

export { freshRadios, radios }
