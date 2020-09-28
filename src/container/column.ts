import type { State, VDOM, View } from "hyperapp"

import { box } from "./box"

export const column = <S>(views: View<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    return box("uy-column", views.map((g) => g(state)))
  }
}
