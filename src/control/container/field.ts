import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ContentView } from "../../utility/hyperappHelper/render"

import * as html from "ntml"
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
  return (state: S): VDOM<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { label, disabled, ...etc } = props
    return box("uy-field", [
      html.label(
        { ...etc, class: [{ disabled }, etc.class] },
        [...encase(label), ...views.map((view) => render(view)(state))]),
    ])
  }
}
