import type { ClassProp, State, VDOM, View } from "hyperapp"

import { box } from "./box"

export const panel = <S>(classProp: ClassProp, views: View<S>[]) => {
  return (state: State<S>): VDOM<S> => {
    return box(classProp, views.map((g) => g(state)))
  }
}
