import type { ClassProp, VDOM } from "hyperapp"
import type { Stuff } from "ntml"

import { div } from "ntml"

const box = <S>(classProp: ClassProp, contents: Stuff<S>[]): VDOM<S> =>
  div({ class: classProp }, contents)

export { box }
