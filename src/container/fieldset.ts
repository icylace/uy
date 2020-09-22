import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ContainerView } from "../types"

import cc from "classcat"
import * as html from "ntml"
import { ui } from "./ui"

export type FieldsetOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  label: Content<S> | Content<S>[]
  locked: boolean
}

const rawFieldset =
  <S>({ disabled, locked, label, ...etc }: FieldsetOptions<S>) =>
    (contents: Content<S> | Content<S>[]): VDOM<S> => {
      const stuff = Array.isArray(contents) ? contents : [contents]
      return html.fieldset(
        {
          disabled,
          ...etc,
          class: cc(["uy-fieldset", { locked, disabled }, etc.class]),
        },
        label ? [html.legend(label), ...stuff] : stuff,
      )
    }

export const fieldset = <S>(props: FieldsetOptions<S>): ContainerView<S> =>
  ui(rawFieldset(props))
