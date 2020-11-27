import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ContentView } from "../types"

import * as html from "ntml"
import { isContent } from "ntml"
import { box } from "./box"

export type FieldOptions<S>
  = Content<S>
  | {
    class?: ClassProp
    disabled?: boolean
    label?: Content<S>
  }

const field = <S>(options: FieldOptions<S>, views: ContentView<S>[]) => (state: State<S>): VDOM<S> => {
  const props = isContent<S>(options) ? { label: options } : options
  const { disabled, label, ...etc } = props
  return box("uy-field", [
    html.label(
      {
        ...etc,
        class: [{ disabled }, etc.class],
      },
      [
        ...(Array.isArray(label) ? label : [label]),
        ...views.map((view) => view(state)),
      ],
    ),
  ])
}

export { field }
