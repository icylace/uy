import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../types"

import { box } from "./box"

export const row = <S>(views: ContentView<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    return box("uy-row", views.map((view) => view(state)))
  }
}
