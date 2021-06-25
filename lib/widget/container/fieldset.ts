import type { ClassProp, MaybeVNode, VNode } from "hyperapp"

import { h } from "hyperapp"
import { using } from "../../utility/using"
import { isContent } from "../../utility/hyperappHelper/content"

export type FieldsetOptions<S> =
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]
  | {
    [_: string]: unknown
    label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
    class?: ClassProp
    disabled?: boolean
  }

export const fieldset = <S>(options: FieldsetOptions<S>, views: ((state: S) => VNode<S>)[]) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    const contents = using(views)(state)
    return h("fieldset", {
      disabled,
      ...etc,
      class: [etc.class ?? "uy-fieldset", { disabled }],
    }, label ? [h("legend", {}, label), ...contents] : contents)
  }
}
