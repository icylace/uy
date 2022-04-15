import type { Action } from "hyperapp"

export { isAction }

// -----------------------------------------------------------------------------

const isAction = <S, P = any>(x: any): x is Action<S, P> =>
  typeof x === "function" || (Array.isArray(x) && x.length > 0)
