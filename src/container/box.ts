import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

export const box = <S>(classProp: ClassProp, content: Content<S>[]): VDOM<S> =>
  div({ class: classProp }, content)
