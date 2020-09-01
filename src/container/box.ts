import type { ClassProp, VDOM } from "hyperapp"
import type { Contents } from "ntml"

import { div } from "ntml"

export const box = (classProp: ClassProp) => (content: Contents): VDOM =>
  div ({ class: classProp }, content)
