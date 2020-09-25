import type { ClassProp, Transform, VDOM } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import { div } from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { rawCheckbox } from "./checkbox"

export type MultiselectOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  options: Record<string, Content<S> | Content<S>[]>
  update: Transform<S>
  usingColumnMode: boolean
}

export type MultiselectData = {
  value: string[]
}

// TODO:
// - maybe use Set here instead?
export const freshMultiselect = (value: string[]): MultiselectData =>
  ({ value })

const rawMultiselect = <S>(props: MultiselectOptions<S>, data: MultiselectData): VDOM<S> => {
  const { disabled, locked, update, options, usingColumnMode, ...etc } = props

  // TODO:
  // - should order matter? is Set the right way to do this?
  const selection = new Set(data.value)
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
      Object.entries(options).map(
        ([value, label]: [string, Content<S> | Content<S>[]]): VDOM<S> => {
          return rawCheckbox(
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

export const multiselect = component(rawMultiselect)
