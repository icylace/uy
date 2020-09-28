import type { State, VDOM, View } from "hyperapp"

import { box } from "./box"

export const row = <S>(views: View<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    return box("uy-row", views.map((g) => g(state)))
  }
}
