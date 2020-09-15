import type { ClassProp, VDOM } from "hyperapp"
import type { Contents } from "ntml"

import { div } from "ntml"

export const box = (classProp: ClassProp) => <S, D = unknown>(content: Contents<S, D>): VDOM<S, D> =>
  div ({ class: classProp }, content)
