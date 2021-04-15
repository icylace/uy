import type { Focus } from "eyepiece"
import type { MaybeVDOM, State } from "hyperapp"

import { get } from "eyepiece"

export const toggle = (...focus: Focus) => <S>(component: (_: State<S>) => MaybeVDOM<S>) => (state: State<S>): MaybeVDOM<S> =>
  get<boolean>(focus)(state) && component(state)
