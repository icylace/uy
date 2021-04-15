import type { Focus } from "eyepiece"
import type { Action, ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import * as html from "ntml"
import { box } from "../container/box"

export type RadiosValue = string

export type RadiosData = {
  value: RadiosValue
}

export type RadiosChoices<S> = Record<string, Content<S>>

export type RadiosOptions<S> =
  | RadiosChoices<S>
  | {
    choices: RadiosChoices<S>
    onchange?: Action<S, RadiosValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshRadios = (value: RadiosValue): RadiosData => ({ value })

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> =>
  typeof x === "object" && !("choices" in x)

const radios = <S>(options: RadiosOptions<S>) => (...focus: Focus) => {
  return (state: S): VDOM<S> => {
    const props = isOnlyChoices<S>(options) ? { choices: options } : options
    const { choices, onchange, disabled, ...etc } = props
    return box("uy-control uy-radios",
      // TODO:
      // - switch to using a Map object instead in order to guarantee order
      Object.entries(choices).map(
        ([value, label]: [string, Content<S>]): VDOM<S> => {
          return html.label({ class: { disabled } }, [
            html.input({
              value,
              checked: value === get<RadiosData>(focus)(state).value,
              type: "radio",
              disabled,
              onchange: (state, event) => {
                const target = event.target as HTMLInputElement
                const nextValue = target.value
                const nextState = set<S>(focus, "value")(nextValue)(state)
                return onchange ? onchange(nextState, nextValue) : nextState
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
