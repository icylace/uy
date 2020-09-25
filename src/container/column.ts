import type { State, VDOM, View } from "hyperapp"

import { box } from "./box"

const column = <S>(views: View<S>[]) =>
  (state: State<S>): VDOM<S> =>
    box("uy-column", views.map((g) => g(state)))

export { column }
