import { h } from "hyperapp"
import { box } from "../container/ui"
import { component } from "../utility/component"
import { action, handleValueWith } from "../utility/event"
import { set } from "../utility/lens"

// @ts-ignore
const { S } = window.sanctuary

// freshDropDown :: String -> ControlData
const freshDropdown = (value: string): any => ({ value, focused: false })

// option :: (String, VNode) -> VNode
const option = ([x, content]: any): any =>
  h("option", Array.isArray(x) ? { value: x[1], ...x[0] } : { value: x }, [content])

// rawDropdown :: DropdownOptions -> Object -> VNode
const rawDropdown = ({ disabled, locked, options, path, update, ...etc }: any) => (data: any): any =>
  box("uy-control uy-dropdown", [
    box({
      disabled,
      locked,
      "uy-dropdown-arrow": true,
      focus: data.focused,
    }, [
      h("select", {
        disabled,
        readonly: locked,
        value: data.value,
        onchange: handleValueWith(update),
        onfocus: action((_event: any) => set([...path, "focused"])(true)),
        onblur: action((_event: any) => set([...path, "focused"])(false)),
        ...etc,
        class: {
          disabled,
          locked,
          "uy-input": true,
          [etc.class]: !!etc.class,
        },
      }, S.pairs(options).map(option)),
    ]),
  ])

// dropdown :: DropdownOptions -> [String] -> State -> VNode
const dropdown = component(rawDropdown)

export { freshDropdown, dropdown }
