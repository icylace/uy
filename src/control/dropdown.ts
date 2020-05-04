import { h } from "hyperapp"
import { component } from "../component"
import { box } from "../container/ui"
import { handleValueWith } from "../utility/hyperappHelper"
import { set } from "../utility/shadesHelper"

// freshDropDown :: String -> ControlData
const freshDropdown = (value: string): any => ({ value, focused: false })

// rawDropdown :: DropdownOptions -> Object -> VNode
const rawDropdown = ({ disabled, locked, options, path, update, ...etc }: any) => (data: any): any => {
  return box ("uy-control uy-dropdown") ([
    box ({
      disabled,
      locked,
      "uy-dropdown-arrow": true,
      focus: data.focused,
    }) ([
      h ("select", {
        disabled,
        readonly: locked,
        value: data.value,
        onchange: handleValueWith (update),
        onfocus: set ([...path, "focused"]) (true),
        onblur: set ([...path, "focused"]) (false),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }, Object.entries (options).map (
        ([x, content]) =>
          h ("option", Array.isArray (x)
            ? { value: x[1], ...x[0] }
            : { value: x }, [content])
      )),
    ]),
  ])
}

// dropdown :: DropdownOptions -> [String] -> State -> VNode
const dropdown = component (rawDropdown)

export { freshDropdown, dropdown }
