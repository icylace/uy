import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../../utility/hyperappHelper/render"

import { render } from "../../utility/hyperappHelper/render"
import { box } from "./box"

export const column = <S>(views: ContentView<S>[]) => (state: State<S>): VDOM<S> =>
  box("uy-column", views.map((view) => render(view)(state)))
