import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../../types"

import { box } from "../../wireless/container/box"

const column = <S>(views: ContentView<S>[]) => {
  return (state: State<S>): VDOM<S> =>
    box("uy-column", views.map((view) => view(state)))
}

export { column }
