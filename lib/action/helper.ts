import { Focus, set } from "eyepiece"

export { Defocus, Refocus }

// -----------------------------------------------------------------------------

const Defocus = <S>(...focus: Focus): ((_: S) => S) => set(focus, "focused")(false)
const Refocus = <S>(...focus: Focus): ((_: S) => S) => set(focus, "focused")(true)
