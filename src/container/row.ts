import type { State, VDOM, View } from "hyperapp"

import { box } from "./box"

const row = <S>(views: View<S>[]) =>
  (state: State<S>): VDOM<S> =>
    box("uy-row", views.map((g) => g(state)))

export { row }
