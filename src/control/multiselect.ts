import type { State, VDOM } from "hyperapp"
import type { Control, ControlData, MultiselectOptions } from "../types"

import { div } from "ntml"
import { component } from "../component"
import { box } from "../container/ui"
import { rawCheckbox } from "./checkbox"

// TODO:
// - maybe use Set here instead?
const freshMultiselect = (value: string[]): ControlData<string[]> => ({
  value,
})

const rawMultiselect = (
  { disabled, locked, update, options, usingColumnMode, ...etc }:
    MultiselectOptions,
) =>
  (data: ControlData<string[]>): VDOM => {
    // TODO:
    // - should order matter? is Set the right way to do this?
    const selection = new Set (data.value)
    return div ({
      ...etc,
      class: {
        disabled,
        locked,
        "uy-control": true,
        "uy-scroller": true,
        "uy-multiselect": true,
        "uy-multiselect--grid-mode": usingColumnMode,
        [etc.class]: !!etc.class,
      },
    }, [
      box ("uy-multiselect-options") (
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        Object.entries (options).map (([x, label]): VDOM =>
          rawCheckbox ({
            disabled,
            label,
            locked,
            update: <S>(state: State<S>, checked: boolean): any => {
              if (checked) {
                selection.add (x)
              } else {
                selection.delete (x)
              }
              // TODO:
              // - maybe return Set directly and maybe also find a way to ensure order?
              return update (state, Array.from (selection))
              // const update = (state: State<S>, value: any): any => set ([...path, "value"]) (value) (state)
            },
          }) ({ value: selection.has (x) }),
        ),
      ),
    ])
  }

const multiselect: Control = component (rawMultiselect)

export { freshMultiselect, multiselect }
