// TODO:
// - get rid of this ?

import type { Focus } from "eyepiece"
import type { MaybeVNode } from "hyperapp"

import { get } from "eyepiece"

export const toggle = (...focus: Focus) => {
  return <S>(component: (_: S) => MaybeVNode<S>) => {
    return (state: S): MaybeVNode<S> => {
      return get<boolean>(focus)(state) && component(state)
    }
  }
}
