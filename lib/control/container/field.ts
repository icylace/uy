import type { ClassProp, VNode } from "hyperapp"
import type { Content } from "../../types"
import type { ContentView } from "../../utility/hyperappHelper/render"

import { h } from "hyperapp"
import { isContent } from "ntml"
import { encase } from "../../utility/encase"
import { render } from "../../utility/hyperappHelper/render"
import { box } from "./box"

export type FieldOptions<S> =
  | Content<S>
  | {
    label?: Content<S>
    class?: ClassProp
    disabled?: boolean
  }

export const field = <S>(options: FieldOptions<S>, views: ContentView<S>[]) => {
  return (state: S): VNode<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    return box("uy-field", [
      h("label", {
        ...etc,
        class: [{ disabled }, etc.class],
      }, [
        ...encase(label),
        ...views.map((view) => render(view)(state)),
      ]),
    ])
  }
}
