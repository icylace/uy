import { h } from "hyperapp"
import { ui } from "./ui"
import { compose } from "../utility/utility"

// rawFieldset :: ComponentOptions -> [VNode] -> VNode
const rawFieldset = ({ disabled, locked, label, ...etc }: any) => (contents: any[]): any =>
  h("fieldset", {
    disabled,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-fieldset": true,
      [etc.class]: !!etc.class,
    },
  }, label ? [h("legend", {}, [label]), ...contents] : contents)

// fieldset :: ComponentOptions -> [AnyFunction] -> State -> VNode
const fieldset = compose(ui)(rawFieldset)

export { fieldset }
