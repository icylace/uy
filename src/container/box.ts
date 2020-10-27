import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

const box = <S>(classProp: ClassProp, contents: Content<S>[]): VDOM<S> => {
  return div({ class: classProp }, contents)
}

export { box }
