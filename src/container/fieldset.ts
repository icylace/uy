import { h } from "/web_modules/hyperapp.js"
import { compose } from "../utility/utility"
import { ui } from "./ui"

// rawFieldset :: ComponentOptions -> [VNode] -> VNode
const rawFieldset = ({ disabled, locked, label, ...etc }: any) => (contents: any[]): any => {
  return h("fieldset", {
    disabled,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-fieldset": true,
      [etc.class]: !!etc.class,
    },
  }, label ? [h("legend", {}, [label]), ...contents] : contents)
}

// fieldset :: ComponentOptions -> [AnyFunction] -> State -> VNode
const fieldset = compose(ui)(rawFieldset)

export { fieldset }
