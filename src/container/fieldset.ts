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

// TODO:
// - `fieldset` -> `fields`
//   - the renaming is to distinguish from the plain `fieldset` HTML element

export const fieldset = <S>(props: FieldsetOptions<S>, views: View<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    const { disabled, locked, label, ...etc } = props
    const contents = views.map((g) => g(state))
    return html.fieldset(
      {
        disabled,
        ...etc,
        class: cc(["uy-fieldset", { locked, disabled }, etc.class]),
      },
      label ? [html.legend(label), ...contents] : contents,
    )
  }
}
