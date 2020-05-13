import type { VDOM, VNode } from "hyperapp"
import type { ComponentOptions } from "../types"

import { h } from "hyperapp"
import { ui } from "./ui"

// TODO:
// type Label = VNode
// type FieldsetOptions = Label | ComponentOptions

const rawFieldset = ({ disabled, locked, label, ...etc }: ComponentOptions) => (contents: VNode): VDOM => {
  return h ("fieldset", {
    disabled,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-fieldset": true,
      [etc.class]: !!etc.class,
    },
  }, label ? [h ("legend", {}, [label]), ...contents as VNode[]] : contents)
}

// fieldset :: ComponentOptions -> [AnyFunction] -> State -> VNode
const fieldset = (props: ComponentOptions): any => ui (rawFieldset (props))

export { fieldset }
