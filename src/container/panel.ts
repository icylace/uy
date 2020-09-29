import type { ClassProp, State, VDOM } from "hyperapp"
import type { ContentView } from "../types"

import { box } from "./box"

export const panel = <S>(classProp: ClassProp, views: ContentView<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    return box(classProp, views.map((view) => view(state)))
  }
}
