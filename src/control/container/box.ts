import type { ClassProp, VDOM } from "hyperapp"
import type { Stuff } from "ntml"

import { div } from "ntml"

export const box = <S>(classProp: ClassProp, contents: Stuff<S>[]): VDOM<S> =>
  div({ class: classProp }, contents)
