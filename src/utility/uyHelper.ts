import type { App, State, Subscriber } from "hyperapp"

import { handleUsing, onMouseDown, onOutside } from "./hyperappHelper"
import { get, mod, set } from "./shadesHelper"
import { delist, map, pipe } from "./utility"

// -----------------------------------------------------------------------------

// addInsideEl :: String -> (State -> State) -> State -> State
const addInsideEl = (id: string): any => set (["uy", "insiders", id])

// removeInsideEl :: String -> State -> State
const removeInsideEl = (id: string): any => mod (["uy", "insiders"]) (delist (id))

// -----------------------------------------------------------------------------

const detectOutside = ([insider, f]: [string, Function]): any =>
  onOutside (`#${insider}`) (
    <S>(_state: State<S>, _event: any): any => pipe (f, removeInsideEl (insider)),
  )

// freshState :: State -> State
const freshState = <S>(state: State<S>): State<S> => ({
  ...state,
  uy: {
    insiders: {},
    mousedownHandlers: {
      detectOutsideAction: <S>(state: State<S>, event: any): State<S> => {
        return handleUsing (pipe (
          get (["uy", "insiders"]),

          // TODO:
          // - switch to using a Map object instead in order to guarantee order
          Object.entries,

          map (detectOutside),
        ) (state)) (state, event)
      },
    },
  },
})

// mouseDownSubscription :: State -> State
const mouseDownSubscription =
  pipe (
    get (["uy", "mousedownHandlers"]),
    Object.values,
    handleUsing,
    onMouseDown,
  )

// -----------------------------------------------------------------------------

// // TODO:
// const uy = (path: Path)

const uyAppConfig = <S, P, D>(config: App<S, P, D>): App<S, P, D> => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: <S>(state: State<S>): Subscriber[] => [mouseDownSubscription (state)],
  init: freshState (config.init),
})

// -----------------------------------------------------------------------------

export {
  addInsideEl,
  removeInsideEl,
  uyAppConfig,
}
