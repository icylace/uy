import type { ClassProp, VNode } from "hyperapp"
import type { ContentView } from "../../utility/hyperappHelper/render"

import { render } from "../../utility/hyperappHelper/render"
import { box } from "./box"

export const panel = <S>(classProp: ClassProp, views: ContentView<S>[]) => (state: S): VNode<S> =>
  box(classProp, views.map((view) => render(view)(state)))
