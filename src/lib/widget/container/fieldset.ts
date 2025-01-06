import { ClassProp, VNode, h } from "hyperapp"
import { Content, View, isContent } from "hyperapplicable"
import { using } from "wtv"

export type { FieldsetOptions }
export { fieldset }

// -----------------------------------------------------------------------------

type FieldsetOptions<S> = Content<S> | FieldsetFullOptions<S>
type FieldsetFullOptions<S> = {
  [_: string]: unknown
  label?: Content<S>
  class?: ClassProp
  disabled?: boolean
}

const fieldset = <S>(options: FieldsetOptions<S>, views: readonly View<S>[]) => (state: S): VNode<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { label, disabled, ...etc } = props
  const contents = using(views)(state)
  return h("fieldset", {
    disabled,
    ...etc,
    class: ["uwye-fieldset", etc.class, { disabled }],
  }, label ? [h("legend", {}, label), ...contents] : contents)
}
