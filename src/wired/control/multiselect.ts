import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../../component"
import type { CheckboxData } from "./checkbox"

import { div } from "ntml"
import { box } from "../../wireless/container/box"
import { checkbox, freshCheckbox } from "./checkbox"

export type MultiselectData = {
  value: string[]
}

export type MultiselectChoices<S> = Record<string, Content<S>>

export type MultiselectOptions<S>
  = MultiselectChoices<S>
  | {
    class?: ClassProp
    disabled?: boolean
    choices: MultiselectChoices<S>
    usingColumnMode?: boolean
  }

// TODO:
// - maybe use Set here instead?
const freshMultiselect = (value: string[]): MultiselectData => {
  return { value }
}

const isOnlyChoices = <S>(x: any): x is Record<string, Content<S>> => {
  return typeof x === "object" && !("choices" in x)
}

const multiselect = <S>(options: MultiselectOptions<S>) => (wiring: Wiring<MultiselectData, S>) => (state: State<S>): VDOM<S> => {
  const props = isOnlyChoices<S>(options) ? { choices: options } : options
  const { disabled, choices, usingColumnMode, ...etc } = props
  const r = wiring.get(state)

  const selection = new Set(r.value)
  return div({
    ...etc,
    class: [
      "uy-control uy-scroller uy-multiselect",
      { "uy-multiselect--grid-mode": !!usingColumnMode, disabled },
      etc.class,
    ],
  }, [
    box("uy-multiselect-options",
      Object.entries(choices).map(
        ([value, label]: [string, Content<S>]): VDOM<S> => {
          const checkboxWiring: Wiring<CheckboxData, S> = {
            get: (_state) => freshCheckbox(selection.has(value)),
            set: (state, checkboxData) => {
              if (checkboxData.value) {
                selection.add(value)
              } else {
                selection.delete(value)
              }
              return wiring.set(state, freshMultiselect(Array.from(selection)))
            },
          }
          return checkbox({ disabled, label })(checkboxWiring)(state)
        }
      ),
    ),
  ])
}

export { freshMultiselect, multiselect }
