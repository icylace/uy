import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ContentView } from "../../types"

import * as html from "ntml"
import { isContent } from "ntml"
import { encase } from "../../utility/encase"
import { box } from "../../wireless/container/box"

export type FieldOptions<S>
  = Content<S>
  | {
    label?: Content<S>
    class?: ClassProp
    disabled?: boolean
  }

export const field = <S>(options: FieldOptions<S>, views: ContentView<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    const props = isContent<S>(options) ? { label: options } : options
    const { disabled, label, ...etc } = props
    return box("uy-field", [
      html.label(
        { ...etc, class: [{ disabled }, etc.class] },
        [...encase(label), ...views.map((view) => view(state))],
      ),
    ])
  }
}
