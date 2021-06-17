import type { ClassProp, VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { using } from "../../utility/using"
import { c } from "../../utility/hyperappHelper/content"

export const panel = <S>(classProp: ClassProp, views: View<S>[]) => (state: S): VNode<S> =>
  h("div", { class: classProp }, c(using(views)(state)))
