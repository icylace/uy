import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../../types"

import { box } from "./box"

export const column = <S>(views: ContentView<S>[]) => (state: State<S>): VDOM<S> =>
  box("uy-column", views.map((view) => view(state)))