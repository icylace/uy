import type { VDOM, VNode } from "hyperapp"
import type { ComponentOptions, ContainerView } from "../types"

import * as html from "../utility/html"
import { ui } from "./ui"

// TODO:
// type Label = VNode
// type FieldsetOptions = Label | ComponentOptions

const rawFieldset = ({ disabled, locked, label, ...etc }: ComponentOptions) =>
  (contents: VNode[]): VDOM => {
    return html.fieldset (
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
      label ? [html.legend (label), ...contents] : contents,
    )
  }

const fieldset = (props: ComponentOptions): ContainerView =>
  ui (rawFieldset (props))

export { fieldset }
