import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../types"

import { box } from "./box"

const column = <S>(views: ContentView<S>[]) => (state: State<S>): VDOM<S> => {
  return box("uy-column", views.map((view) => view(state)))
}

export { column }
