import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import { View, isContent } from "hyperapplicable"
import { encase, using } from "wtv"

export type { FieldOptions }
export { field }

// -----------------------------------------------------------------------------

type FieldOptions<S> =
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]
  | {
      label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
      class?: ClassProp
      disabled?: boolean
    }

const field = <S>(options: FieldOptions<S>, views: View<S>[]) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    return h("div", { ...etc, class: ["uy-field", etc.class, { disabled }] }, [
      h("label", {}, [...encase(label), ...using(views)(state)]),
    ])
  }
}
