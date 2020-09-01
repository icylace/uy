import type { VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { ComponentOptions, ContainerView } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { ui } from "./ui"

export type FieldsetOptions = ComponentOptions & {
  label: Contents
}

const rawFieldset = ({ disabled, locked, label, ...etc }: FieldsetOptions) => (contents: Contents): VDOM =>
  html.fieldset (
    {
      disabled,
      ...etc,
      class: cc (["uy-fieldset", { locked, disabled }, etc.class]),
    },
    label
      ? Array.isArray (contents)
        ? [html.legend (label), ...contents]
        : [html.legend (label), contents]
      : contents,
  )

export const fieldset = (props: FieldsetOptions): ContainerView =>
  ui (rawFieldset (props))
