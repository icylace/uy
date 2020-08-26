import type { VDOM } from "hyperapp"
import type { ComponentOptions, ContainerView, Content } from "../types"

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
      class: {
        disabled,
        locked,
        "uy-fieldset": true,
        // TODO:
        // - handle all class prop variations
        [etc.class as string]: !!etc.class,
      },
    },
    label
      ? Array.isArray(content)
        ? [html.legend (label), ...content]
        : [html.legend (label), content]
      : content,
  )

const fieldset = (props: ComponentOptions): ContainerView =>
  ui (rawFieldset (props))

export { fieldset }
