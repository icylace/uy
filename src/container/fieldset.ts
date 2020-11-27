import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"

import * as html from "ntml"
import { isContent } from "ntml"

export type FieldsetOptions<S>
  = Content<S>
  | {
    [_: string]: unknown
    class?: ClassProp
    disabled?: boolean
    label?: Content<S>
  }

// TODO:
// - `fieldset` -> `fields`
//   - the renaming is to distinguish from the plain `fieldset` HTML element

const fieldset = <S>(options: FieldsetOptions<S>, views: View<S>[]) => (state: State<S>): VDOM<S> => {
  const props = isContent<S>(options) ? {} : options
  const { disabled, label, ...etc } = props
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
