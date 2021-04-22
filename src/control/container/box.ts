import type { ClassProp, VNode } from "hyperapp"
import type { Stuff } from "ntml"

import { div } from "ntml"

export const box = <S>(classProp: ClassProp, contents: Stuff<S>[]): VNode<S> =>
  div({ class: classProp }, contents)
