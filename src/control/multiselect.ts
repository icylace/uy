import type { ClassProp, State, Transition, VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { Transform } from "../types"

import cc from "classcat"
import { div } from "ntml"
import { component } from "../component"
import { box } from "../container/box"
import { rawCheckbox } from "./checkbox"

export type MultiselectOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  options: Record<string, Contents<S>>
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

const rawMultiselect =
  <S>({ disabled, locked, update, options, usingColumnMode, ...etc }: MultiselectOptions<S>) =>
    (data: MultiselectData): VDOM<S> => {
      // TODO:
      // - should order matter? is Set the right way to do this?
      const selection = new Set (data.value)
      return div ({
        ...etc,
        class: cc ([
          "uy-control uy-scroller uy-multiselect",
          { "uy-multiselect--grid-mode": usingColumnMode, locked, disabled },
          etc.class,
        ]),
      }, [
        box ("uy-multiselect-options") (
          // TODO:
          // - switch to using a Map object instead in order to guarantee order
          Object.entries (options).map (
            ([value, label]: [string, Contents<S>]): VDOM<S> =>
              rawCheckbox ({
                disabled,
                label,
                locked,
                update: (state: State<S>, checked?: boolean): Transition<S> => {
                  if (checked) {
                    selection.add (value)
                  } else {
                    selection.delete (value)
                  }
                  // TODO:
                  // - maybe return Set directly and maybe also find a way to ensure order?
                  return update (state, Array.from (selection))
                  // const update = (state: State<S>, value: any): any => set ([...path, "value"]) (value) (state)
                },
              }) ({ value: selection.has (value) }),
          ),
        ),
      ]) as VDOM<S>
    }

export const multiselect = component (rawMultiselect)
