import { ClassProp, VNode, h } from "hyperapp"
import { Content, View, isContent } from "hyperapplicable"
import { encase, using } from "wtv"

export type { FieldOptions }
export { field }

// -----------------------------------------------------------------------------

type FieldOptions<S> = Content<S> | FieldFullOptions<S>
type FieldFullOptions<S> = {
  label?: Content<S>
  class?: ClassProp
  disabled?: boolean
}

const field = <S>(options: FieldOptions<S>, views: readonly View<S>[]) => (state: S): VNode<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { label, disabled, ...etc } = props
  return h("div", { ...etc, class: ["uy-field", etc.class, { disabled }] }, [
    h("label", {}, [...encase(label), ...using(views)(state)]),
  ])
}
