import type { VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ComponentOptions, ContainerView } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { ui } from "./ui"

export type FieldsetOptions = ComponentOptions & {
  label: Content
}

const rawFieldset = ({ disabled, locked, label, ...etc }: FieldsetOptions) => (content: Content): VDOM =>
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

export const fieldset = (props: FieldsetOptions): ContainerView =>
  ui (rawFieldset (props))
