import type { ClassProp, State, VDOM, View } from "hyperapp"

import { box } from "./box"

const panel = (classProp: ClassProp) =>
  <S>(views: View<S>[]) =>
    (state: State<S>): VDOM<S> =>
      box(classProp, views.map((g) => g(state)))

export { panel }
