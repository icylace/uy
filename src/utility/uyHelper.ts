import type {
  Action,
  App,
  Dispatch,
  State,
  Transition,
  Subscriber,
} from "hyperapp"
import type { Transform } from "../types"

import { fx, handleUsing, onMouseDown, onOutside } from "./hyperappHelper"
import { get, mod, set } from "./shadesHelper"
import { delist } from "./utility"

// -----------------------------------------------------------------------------

export const addInsideEl = (id: string) => <S>(f: Transform<S>) => (state: State<S>): State<S> =>
  set (["uy", "insiders", id]) (f) (state)

export const removeInsideEl = (id: string) => <S>(state: State<S>): State<S> =>
  mod (["uy", "insiders"]) (delist (id)) (state)

// -----------------------------------------------------------------------------

const freshState = <S>(state: State<S>): State<S> => ({
  ...state,
  uy: {
    insiders: {},
    mousedownHandlers: {
      detectOutsideAction: (state: State<S>, event: Event): Transition<S> => {
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        const insiders: [string, Transform<S>][] = Object.entries (
          get (["uy", "insiders"]) (state) ?? {}
        )
        const detectionsOutside: Action<S, Event>[] = insiders.map (
          ([insider, f]: [string, Transform<S>]): Action<S, Event> =>
            onOutside (`#${insider}`) ((state) => removeInsideEl (insider) (f (state)))
        )
        return handleUsing (detectionsOutside) (state, event)
      },
    },
  },
})

// -----------------------------------------------------------------------------

// TODO:

const mouseDownSubscriptionAction = <S>(state: State<S>): Transition<S> => {
  const handlerMap = get (["uy", "mousedownHandlers"]) (state) as Record<string, Action<S>>
  const handlers = Object.values (handlerMap)
  const transitioner = handleUsing (handlers)
  return onMouseDown (transitioner)
}

const runMouseDownSubscription = <S>(dispatch: Dispatch<S>): void => {
  window.requestAnimationFrame (() => dispatch (mouseDownSubscriptionAction))
}

// -----------------------------------------------------------------------------

// // TODO:
// const uy = (path: Path)

export const uyAppConfig = <S>(config: App<S>): App<S> => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: (_state: State<S>): Subscriber<S>[] => [
    runMouseDownSubscription,
  ],
  init: freshState (config.init),
})
