import type { ClassProp, VDOM } from "hyperapp"
import type { Content } from "ntml"

import { div } from "ntml"

export const box = (classProp: ClassProp) => (content: Content): VDOM =>
  div ({ class: classProp }, content)
