import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"

export type FieldsetOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  title?: Content<S> | Content<S>[]
  locked?: boolean
}

// TODO:
// - `fieldset` -> `fields`
//   - the renaming is to distinguish from the plain `fieldset` HTML element

const fieldset = <S>(title: Content<S> | Content<S>[], options: FieldsetOptions<S>, views: View<S>[]) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, ...etc } = options
  const contents = views.map((g) => g(state))
  return html.fieldset(
    {
      disabled,
      ...etc,
      class: ["uy-fieldset", { locked, disabled }, etc.class],
    },
    title ? [html.legend(title), ...contents] : contents,
  )
}

export { fieldset }
