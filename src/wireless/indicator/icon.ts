import type { ClassProp, VDOM } from "hyperapp"

import { i } from "ntml"

const icon = <S>(classProp: ClassProp): VDOM<S> => {
  return i({ class: ["uy-indicator uy-icon", classProp] })
}

export { icon }
