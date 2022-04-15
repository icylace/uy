import type { StateForm, Transform } from "./types"

export { unite }

// -----------------------------------------------------------------------------

const unite = <S, P = any>(t: Transform<S>, s: StateForm<S>, payload?: P): StateForm<S> => {
  if (!Array.isArray(s)) return t(s, payload)
  const [state1, ...fx1] = s
  const s2 = t(state1, payload)
  if (!Array.isArray(s2)) return [s2, ...fx1]
  const [state2, ...fx2] = s2
  return [state2, ...fx1, ...fx2]
}
