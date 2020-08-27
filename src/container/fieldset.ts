import type { VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ComponentOptions, ContainerView } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { ui } from "./ui"

// TODO:
// type Label = VNode
// type FieldsetOptions = Label | ComponentOptions

const rawFieldset = ({ disabled, locked, label, ...etc }: ComponentOptions) => (content: Content): VDOM =>
  html.fieldset (
    {
      disabled,
      ...etc,
      class: cc (["uy-fieldset", { locked, disabled }, etc.class]),
    },
    label
      ? Array.isArray (content)
        ? [html.legend (label), ...content]
        : [html.legend (label), content]
      : content,
  )

const fieldset = (props: ComponentOptions): ContainerView =>
  ui (rawFieldset (props))

export { fieldset }
