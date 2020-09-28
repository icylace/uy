import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import * as html from "ntml"

export type FieldsetOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  label: Content<S> | Content<S>[]
  locked?: boolean
}

const rawFieldset = <S>(props: FieldsetOptions<S>, contents: Content<S> | Content<S>[]): VDOM<S> => {
  const { disabled, locked, label, ...etc } = props
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

export const fieldset = <S>(props: FieldsetOptions<S>, views: View<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    return rawFieldset(props, views.map((g) => g(state)))
  }
}
