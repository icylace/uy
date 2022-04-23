import { Focus, set } from "eyepiece"

export { Defocus, Refocus }

// -----------------------------------------------------------------------------

type Focuser = <S>(..._: Focus) => ((_: S) => S)

const Defocus: Focuser = (...focus) => set(focus, "focused")(false)
const Refocus: Focuser = (...focus) => set(focus, "focused")(true)
