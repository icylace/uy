import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { CheckboxData } from "./checkbox"

import { div } from "ntml"
import { box } from "../container/box"
import { checkbox, freshCheckbox } from "./checkbox"

export type MultiselectData = {
  value: string[]
}

export type MultiselectOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  choices: Record<string, Content<S> | Content<S>[]>
  usingColumnMode: boolean
}

// TODO:
// - maybe use Set here instead?
const freshMultiselect = (value: string[]): MultiselectData => {
  return { value }
}

const multiselect = <S>(options: MultiselectOptions<S>) => (wiring: Wiring<S, MultiselectData>) => (state: State<S>): VDOM<S> => {
  const { disabled, choices, usingColumnMode, ...etc } = options
  const r = wiring.get(state)

  const selection = new Set(r.value)
  return div({
    ...etc,
    class: [
      "uy-control uy-scroller uy-multiselect",
      { "uy-multiselect--grid-mode": usingColumnMode, disabled },
      etc.class,
    ],
  }, [
    box("uy-multiselect-options",
      Object.entries(choices).map(
        ([value, label]: [string, Content<S> | Content<S>[]]): VDOM<S> => {
          const checkboxWiring: Wiring<S, CheckboxData> = {
            get: (_state) => freshCheckbox(selection.has(value)),
            mod: (state) => state,
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
