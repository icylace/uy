import type { Focus } from "eyepiece"

import { set } from "eyepiece"

export const Defocus = <S>(focus: Focus) => set<S>(focus, "focused")(false)
export const Refocus = <S>(focus: Focus) => set<S>(focus, "focused")(true)
