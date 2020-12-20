import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../../wireless/container/box"

export type RadiosData = {
  value: string
}

export type RadiosChoices<S> = Record<string, Content<S>>

export type RadiosOptions<S>
  = RadiosChoices<S>
  | {
    choices: RadiosChoices<S>
    class?: ClassProp
    disabled?: boolean
  }

const freshRadios = (value: string): RadiosData => ({ value })

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> =>
  typeof x === "object" && !("choices" in x)

const radios = <S>(options: RadiosOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
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
              checked: value === get<RadiosData>(focus)(state).value,
              type: "radio",
              onchange: (state, event) => {
                if (!event) return state
                const target = event.target as HTMLInputElement
                return set<State<S>>(focus, "value")(target.value)(state) ?? state
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
}

export { freshRadios, radios }
