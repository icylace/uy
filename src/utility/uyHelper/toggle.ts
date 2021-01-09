import type { Focus } from "eyepiece"
import type { State, VNode } from "hyperapp"

import { get } from "eyepiece"

export const toggle = (...focus: Focus) => <S>(component: (_: State<S>) => VNode<S>) => (state: State<S>): VNode<S> =>
  get<boolean>(focus)(state) && component(state)
