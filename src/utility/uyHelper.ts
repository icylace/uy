import type {
  App,
  Dispatch,
  State,
  Transition,
  Subscriber,
} from "hyperapp"

import { fx, handleUsing, onMouseDown, onOutside } from "./hyperappHelper"
import { get, mod, set } from "./shadesHelper"
import { delist, pipe } from "./utility"

// -----------------------------------------------------------------------------

export const addInsideEl = (id: string) => (f: Function) => <S>(state: State<S>): State<S> =>
  set (["uy", "insiders", id]) (f) (state)

export const removeInsideEl = (id: string) => <S>(state: State<S>): State<S> =>
  mod (["uy", "insiders"]) (delist (id)) (state)

// -----------------------------------------------------------------------------

const detectOutside = ([insider, f]: [string, (a: any) => any]): any =>
  onOutside (`#${insider}`) (<S>(_state: State<S>, _event: Event) => (state: State<S>): State<S> =>
    removeInsideEl (insider) (f (state)),
  )

const freshState = <S>(state: State<S>): State<S> => ({
  ...state,
  uy: {
    insiders: {},
    mousedownHandlers: {
      detectOutsideAction: (state: State<S>, event: Event): Transition<S> => {
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        const insiders = Object.entries (get (["uy", "insiders"]) (state) ?? {})
        const detections = insiders.map (detectOutside)
        return handleUsing (detections)

        // detections.reduce((acc, f) => f (acc, event), state)

        // handleUsing (
        //   pipe (
        //     get (["uy", "insiders"]),
        //     // TODO:
        //     // - switch to using a Map object instead in order to guarantee order
        //     Object.entries,
        //     map (detectOutside),
        //   ) (state),
        // ) (state, event),

        // handleUsing (
        //   pipe (
        //     get (["uy", "insiders"]),
        //     // TODO:
        //     // - switch to using a Map object instead in order to guarantee order
        //     Object.entries,
        //     map (detectOutside),
        //   ) (state),
        // ) (state, event),
      },
    },
  },
})

// -----------------------------------------------------------------------------

const mouseDownSubscriptionAction = <S>(state: State<S>): State<S> =>
  pipe (
    get (["uy", "mousedownHandlers"]),
    Object.values,
    handleUsing,
    onMouseDown,
  ) (state)

const runMouseDownSubscription = <S>(dispatch: Dispatch<S>): void => {
  window.requestAnimationFrame (() => dispatch (mouseDownSubscriptionAction))
}

const mouseDownSubscription = fx (runMouseDownSubscription) (null)

// -----------------------------------------------------------------------------

// // TODO:
// const uy = (path: Path)

export const uyAppConfig = <S>(config: App<S>): App<S> => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: (_state: State<S>): Subscriber<S>[] => [
    mouseDownSubscription,
  ],
  init: freshState (config.init),
})
