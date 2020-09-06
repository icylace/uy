import type { ClassProp, VDOM } from "hyperapp"
import type { Contents } from "ntml"

import { div } from "ntml"

export const box = (classProp: ClassProp) => <S>(content: Contents<S>): VDOM<S> =>
  div ({ class: classProp }, content) as VDOM<S>
