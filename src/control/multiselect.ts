import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { rawCheckbox } from "./checkbox"

// freshMultiselect :: [String] -> ControlData
const freshMultiselect = (value: string[]): any => ({ value })

// rawMultiselect :: MultiselectOptions -> Object -> VNode
const rawMultiselect = ({ disabled, locked, update, options, usingColumnMode, ...etc }: any) => (data: any): any => {
  const selection = new Set(data.value)
  return h("div", {
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
  })([
    box("uy-multiselect-options")(
      Object.entries(options).map(([x, label]: any) =>
        rawCheckbox({
          disabled,
          label,
          locked,
          update: (state: any, checked: boolean) => {
            if (checked) {
              selection.add(x)
            } else {
              selection.delete(x)
            }
            return update(Array.from(selection))(state)
          },
        })({ value: selection.has(x) })
      )
    ),
  ])
}

// multiselect :: MultiselectOptions -> [String] -> State -> VNode
const multiselect = component(rawMultiselect)

export { freshMultiselect, multiselect }
