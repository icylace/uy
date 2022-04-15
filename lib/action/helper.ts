import { Focus, set } from "eyepiece"

export { Defocus, Refocus }

// -----------------------------------------------------------------------------

const Defocus = <S>(focus: Focus) => set<S>(focus, "focused")(false)
const Refocus = <S>(focus: Focus) => set<S>(focus, "focused")(true)
