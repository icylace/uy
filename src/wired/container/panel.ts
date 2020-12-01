import type { ClassProp, State, VDOM } from "hyperapp"
import type { ContentView } from "../../types"

import { box } from "../../wireless/container/box"

const panel = <S>(classProp: ClassProp, views: ContentView<S>[]) => (state: State<S>): VDOM<S> => {
  return box(classProp, views.map((view) => view(state)))
}

export { panel }
