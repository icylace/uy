import type { ClassProp, State, VDOM } from "hyperapp"
import type { ContentView } from "../../utility/hyperappHelper/render"

import { render } from "../../utility/hyperappHelper/render"
import { box } from "./box"

export const panel = <S>(classProp: ClassProp, views: ContentView<S>[]) => (state: State<S>): VDOM<S> =>
  box(classProp, views.map((view) => render(view)(state)))
