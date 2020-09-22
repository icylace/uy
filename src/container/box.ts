import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

export const box = (classProp: ClassProp) => <S>(content: Content<S>[]): VDOM<S> =>
  div({ class: classProp }, content)
