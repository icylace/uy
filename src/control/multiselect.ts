import type { ClassProp, State, Transform, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import cc from "classcat"
import { div } from "ntml"
import { box } from "../container/box"
import { checkbox, freshCheckbox } from "./checkbox"

export type MultiselectData = {
  value: string[]
}

export type MultiselectOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  choices: Record<string, Content<S> | Content<S>[]>
  update: Transform<S>
  usingColumnMode: boolean
  wiring: Wiring<S, MultiselectData>
}

// TODO:
// - maybe use Set here instead?
const freshMultiselect = (value: string[]): MultiselectData => {
  return { value }
}

const multiselect = <S>(options: MultiselectOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, update, choices, usingColumnMode, wiring, ...etc } = options
  const r = wiring.data(state)

  // TODO:
  // - should order matter? is Set the right way to do this?
  const selection = new Set(r.value)
  return div({
    ...etc,
    class: cc([
      "uy-control uy-scroller uy-multiselect",
      { "uy-multiselect--grid-mode": usingColumnMode, locked, disabled },
      etc.class,
    ]),
  }, [
    box("uy-multiselect-options",
      // TODO:
      // - switch to using a Map object instead in order to guarantee order
      Object.entries(choices).map(
        ([value, label]: [string, Content<S> | Content<S>[]]): VDOM<S> => {
          const checkboxWiring = {
            data: (_state) => freshCheckbox(selection.has(value)),
            update: (state, checked) => {
              if (checked) {
                selection.add(value)
              } else {
                selection.delete(value)
              }
              // TODO:
              // - maybe return Set directly and maybe also find a way to ensure order?
              return wiring.update(state, selection.has(value))
              // return update (state, Array.from (selection))
              // const update = (state: State<S>, value: any): any => set ([...path, "value"]) (value) (state)
            },
          }
          return checkbox(
            {
              disabled,
              label,
              locked,
              update: (state, checked) => {
                if (checked) {
                  selection.add(value)
                } else {
                  selection.delete(value)
                }
                // TODO:
                // - maybe return Set directly and maybe also find a way to ensure order?
                return update(state, selection.has(value))
                // return update (state, Array.from (selection))
                // const update = (state: State<S>, value: any): any => set ([...path, "value"]) (value) (state)
              },
            },
            { value: selection.has(value) }
          )
        }
      ),
    ),
  ])
}

export { freshMultiselect, multiselect }
