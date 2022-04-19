// TODO:
// - get rid of this ?

import type { MaybeVNode } from "hyperapp"
import { Focus, get } from "eyepiece"

export { toggle }

// -----------------------------------------------------------------------------

const toggle = (...focus: Focus) =>
  <S>(component: (_: S) => MaybeVNode<S>) =>
    (state: S): MaybeVNode<S> =>
      get<boolean>(focus)(state) && component(state)
