import type { VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"

import { box } from "./box"

export const column = <S>(views: View<S>[]) => (state: S): VNode<S> =>
  box("uy-column", views.map((view) => view(state)))
