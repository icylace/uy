import { h } from "hyperapp"
import { ui } from "./ui"

// rawFieldset :: ComponentOptions -> [VNode] -> VNode
const rawFieldset = ({ disabled, locked, label, ...etc }: any) => (contents: any[]): any => {
  return h ("fieldset", {
    disabled,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-fieldset": true,
      [etc.class]: !!etc.class,
    },
  }, label ? [h ("legend", {}, [label]), ...contents] : contents)
}

// fieldset :: ComponentOptions -> [AnyFunction] -> State -> VNode
const fieldset = (state: any): any => ui (rawFieldset (state))

export { fieldset }
