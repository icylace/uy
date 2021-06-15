import type { ClassProp, VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"

import { box } from "./box"
import { using } from "../../utility/using"

export const panel = <S>(classProp: ClassProp, views: View<S>[]) => (state: S): VNode<S> =>
  box(classProp, using(views)(state))
  // box(classProp, views.map((view) => view(state)))
