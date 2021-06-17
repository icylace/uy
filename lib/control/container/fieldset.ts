import type { ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { using } from "../../utility/using"
import { c, isContent } from "../../utility/hyperappHelper/content"

export type FieldsetOptions<S> =
  | Content<S>
  | {
    [_: string]: unknown
    label?: Content<S>
    class?: ClassProp
    disabled?: boolean
  }

// TODO:
// - `fieldset` -> `fields`
//   - the renaming is to distinguish from the plain `fieldset` HTML element

export const fieldset = <S>(options: FieldsetOptions<S>, views: ((state: S) => VNode<S>)[]) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    const contents = using(views)(state)
    return h("fieldset", {
      disabled,
      ...etc,
      class: ["uy-fieldset", { disabled }, etc.class],
    }, label ? [h("legend", {}, c(label)), ...contents] : contents)
  }
}
