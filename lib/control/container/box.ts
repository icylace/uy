import type { ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { h } from "hyperapp"
import { c } from "../../utility/hyperappHelper/content"

export const box = <S>(classes: ClassProp, contents: Content<S>): VNode<S> =>
  h("div", { class: classes }, c(contents))
