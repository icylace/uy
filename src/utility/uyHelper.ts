import type { App, Payload, State, Subscriber } from "hyperapp"
// import type { Handler } from "../types"

import { handleUsing, onMouseDown, onOutside } from "./hyperappHelper"
import { get, mod, set } from "./shadesHelper"
import { delist, map, pipe } from "./utility"

// -----------------------------------------------------------------------------

// addInsideEl :: String -> (State -> State) -> State -> State
export const addInsideEl = (id: string): any => set (["uy", "insiders", id])

// removeInsideEl :: String -> State -> State
export const removeInsideEl = (id: string): any => mod (["uy", "insiders"]) (delist (id))

// -----------------------------------------------------------------------------

const detectOutside = ([insider, f]: [string, (a: any) => any]): any =>
  onOutside (`#${insider}`) (<S>(_state: State<S>, _event: any): any =>
    pipe (f, removeInsideEl (insider)),
  )

const freshState = <S, P>(state: State<S>): State<S> => ({
  ...state,
  uy: {
    insiders: {},
    mousedownHandlers: {
      detectOutsideAction: (state: State<S>, event: Payload<P>): State<S> =>
        handleUsing (
          pipe (
            get (["uy", "insiders"]),
            // TODO:
            // - switch to using a Map object instead in order to guarantee order
            Object.entries,
            map (detectOutside),
          ) (state),
        ) (state, event),
    },
  },
})

const mouseDownSubscription = <S>(state: State<S>): State<S> =>
  pipe (
    get (["uy", "mousedownHandlers"]),
    Object.values,
    handleUsing,
    onMouseDown,
  ) (state)

// type Subscriber<S> = boolean | undefined | Effect<S> | Unsubscribe

// -----------------------------------------------------------------------------

// // TODO:
// const uy = (path: Path)

export const uyAppConfig = <S>(config: App<S>): App<S> => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: (state: State<S>): Subscriber<S>[] => [mouseDownSubscription (state)],
  init: freshState (config.init),
})



// type Subscription<S> = (state: State<S>) => Subscriber<S>[]
