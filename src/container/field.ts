import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ContentView } from "../types"

import { label } from "ntml"
import { box } from "./box"

export type FieldOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  title: Content<S> | Content<S>[]
}

const field = <S>(options: FieldOptions<S>, views: ContentView<S>[]) => (state: State<S>): VDOM<S> => {
  const { disabled, title, ...etc } = options
  return box("uy-field", [
    label(
      {
        ...etc,
        class: [{ disabled }, etc.class],
      },
      [
        ...(Array.isArray(title) ? title : [title]),
        ...views.map((view) => view(state)),
      ],
    ),
  ])
}

export { field }
