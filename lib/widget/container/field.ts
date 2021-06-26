import type { ClassProp, MaybeVNode, VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { encase } from "../../utility/encase"
import { using } from "../../utility/using"
import { isContent } from "../../utility/hyperappHelper/content"

export type FieldOptions<S> =
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]
  | {
      label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
      class?: ClassProp
      disabled?: boolean
    }

export const field = <S>(options: FieldOptions<S>, views: View<S>[]) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    return h("div", { ...etc, class: ["uy-field", etc.class, { disabled }] }, [
      h("label", {}, [...encase(label), ...using(views)(state)]),
    ])
  }
}
