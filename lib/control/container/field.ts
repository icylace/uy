import type { ClassProp, VNode } from "hyperapp"
import type { Content, View } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { encase } from "../../utility/encase"
import { c, isContent } from "../../utility/hyperappHelper/content"
import { box } from "./box"

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
    return box("uy-field", [
      h("label", { ...etc, class: [{ disabled }, etc.class] }, [
        ...encase(c(label)),
        ...views.map((view) => view(state)),
      ]),
    ])
  }
}
