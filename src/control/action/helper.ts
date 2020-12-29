import type { Focus } from "eyepiece"
import type { State } from "hyperapp"

import { set } from "eyepiece"

export const Defocus = <S>(focus: Focus) => set<State<S>>(focus, "focused")(false)
export const Refocus = <S>(focus: Focus) => set<State<S>>(focus, "focused")(true)
