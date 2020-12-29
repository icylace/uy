import type { Focus } from "eyepiece"
import type { State } from "hyperapp"

import { set } from "eyepiece"

export const Blur = <S>(focus: Focus) => set<State<S>>(focus, "focused")(false)
export const Ogle = <S>(focus: Focus) => set<State<S>>(focus, "focused")(true)
