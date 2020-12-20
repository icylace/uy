import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../../types"

import { box } from "../../wireless/container/box"

export const row = <S>(views: ContentView<S>[]) => (state: State<S>): VDOM<S> =>
  box("uy-row", views.map((view) => view(state)))
