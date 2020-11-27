import type { Action } from "hyperapp"

const isAction = <S, P = any>(x: any): x is Action<S, P> => {
  return typeof x === "function" || (Array.isArray(x) && x.length > 0)
}

export { isAction }
