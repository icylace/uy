import type { ClassProp, VNode } from "hyperapp"
import type { Content, View } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { encase } from "../../utility/encase"
import { using } from "../../utility/using"
import { c, isContent } from "../../utility/hyperappHelper/content"

export type FieldOptions<S> =
  | Content<S>
  | {
    label?: Content<S>
    class?: ClassProp
    disabled?: boolean
  }

export const field = <S>(options: FieldOptions<S>, views: View<S>[]) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    return h("div", { ...etc, class: [etc.class ?? "uy-field", { disabled }] }, [
      h("label", {}, [...encase(c(label)), ...using(views)(state)]),
    ])
  }
}
