import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"

export type FieldsetOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  label?: Content<S> | Content<S>[]
}

// TODO:
// - `fieldset` -> `fields`
//   - the renaming is to distinguish from the plain `fieldset` HTML element

const fieldset = <S>(options: FieldsetOptions<S>, views: View<S>[]) => (state: State<S>): VDOM<S> => {
  const { disabled, label, ...etc } = options
  const contents = views.map((g) => g(state))
  return html.fieldset(
    {
      disabled,
      ...etc,
      class: ["uy-fieldset", { disabled }, etc.class],
    },
    label ? [html.legend(label), ...contents] : contents,
  )
}

export { fieldset }
