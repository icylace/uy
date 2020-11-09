import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ContentView } from "../types"

import cc from "classcat"
import { label } from "ntml"
import { box } from "./box"

export type FieldOptions = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}

const field = <S>(title: Content<S>, options: FieldOptions, views: ContentView<S>[]) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, ...etc } = options
  return box("uy-field", [
    label(
      {
        ...etc,
        class: cc([{ locked, disabled }, etc.class]),
      },
      [
        title,
        ...views.map((view) => view(state)),
      ],
    ),
  ])
}

export { field }
