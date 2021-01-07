import type { State, VDOM } from "hyperapp"
import type { ContentView } from "../../utility/hyperappHelper/render"

import { render } from "../../utility/hyperappHelper/render"
import { box } from "./box"

export const row = <S>(views: ContentView<S>[]) => (state: State<S>): VDOM<S> =>
  box("uy-row", views.map((view) => render(view)(state)))
