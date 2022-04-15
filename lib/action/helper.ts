import { Focus, set } from "eyepiece"

export { Defocus, Refocus }

// -----------------------------------------------------------------------------

const Defocus = (focus: Focus) => set(focus, "focused")(false)
const Refocus = (focus: Focus) => set(focus, "focused")(true)
