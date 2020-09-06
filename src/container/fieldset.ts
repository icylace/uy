import type { ClassProp, VDOM } from "hyperapp"
import type { Contents } from "ntml"
import type { ContainerView } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { ui } from "./ui"

export type FieldsetOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  label: Contents<S>
  locked: boolean
}

const rawFieldset =
  <S>({ disabled, locked, label, ...etc }: FieldsetOptions<S>) =>
    (contents: Contents<S>): VDOM<S> =>
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
      ) as VDOM<S>

export const fieldset = <S>(props: FieldsetOptions<S>): ContainerView<S> =>
  ui (rawFieldset (props))
