// TODO:
// - get rid of this ?

import type { MaybeVNode } from "hyperapp"
import { Focus, get } from "eyepiece"

export { toggle }

// -----------------------------------------------------------------------------

const toggle = (...focus: Focus) => {
  return <S>(component: (_: S) => MaybeVNode<S>) => {
    return (state: S): MaybeVNode<S> => {
      return get<boolean>(focus)(state) && component(state)
    }
  }
}
