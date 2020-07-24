import type { VDOM, VNode } from "hyperapp"
import type { ComponentOptions, ContainerView } from "../types"

import { h } from "hyperapp"

import { content } from "../utility/hyperappHelper"
import { ui } from "./ui"

// TODO:
// type Label = VNode
// type FieldsetOptions = Label | ComponentOptions

const rawFieldset = ({ disabled, locked, label, ...etc }: ComponentOptions) => (contents: VNode[]): VDOM => {
  return h (
    "fieldset",
    {
      disabled,
      ...etc,
      class: {
        disabled,
        locked,
        "uy-fieldset": true,
        [etc.class]: !!etc.class,
      },
    },
    label
      ? [
          h ("legend", {}, content (label)),
          ...contents,
        ]
      : contents
  )
}

const fieldset = (props: ComponentOptions): ContainerView => ui (rawFieldset (props))

export { fieldset }
