import type { State, VDOM } from "hyperapp"
import type { ControlData, MultiselectOptions } from "../types"

import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { rawCheckbox } from "./checkbox"

const freshMultiselect = (value: string[]): ControlData<string[]> => ({ value })

const rawMultiselect = ({ disabled, locked, update, options, usingColumnMode, ...etc }: MultiselectOptions) => (data: ControlData<string[]>): VDOM => {
  const selection = new Set (data.value)
  return h ("div", {
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
            return update (state, Array.from (selection))
          },
        }) ({ value: selection.has (x) })
      )
    ),
  ])
}

// multiselect :: MultiselectOptions -> [String] -> State -> VNode
const multiselect = component (rawMultiselect)

export { freshMultiselect, multiselect }
