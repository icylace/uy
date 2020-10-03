import type {
  App,
  Dispatch,
  EffectfulState,
  Payload,
  State,
  Transform,
  Subscriber,
} from "hyperapp"

import { handleUsing, onMouseDown, onOutside } from "./hyperappHelper"
import { get, mod, set } from "./shadesHelper"
import { delist } from "./utility"

// -----------------------------------------------------------------------------

export const addInsideEl = <S>(id: string, f: Transform<S>) => {
  return (state: State<S>): State<S> => {
    return set(["uy", "insiders", id])(f)(state)
  }
}

export const removeInsideEl = (id: string) => {
  return <S>(state: State<S>): State<S> => {
    return mod(["uy", "insiders"])(delist(id))(state)
  }
}

// -----------------------------------------------------------------------------

const freshState = <S>(state: State<S>): State<S> => ({
  ...state,
  uy: {
    insiders: {},
    mousedownHandlers: {
      detectOutsideAction: (state: State<S>, event: Event): State<S> | EffectfulState<S> => {
        // TODO:
        // - switch to using a Map object instead in order to guarantee order
        const insiders: [string, Transform<S>][] = Object.entries(
          get(["uy", "insiders"])(state) ?? {}
        )
        const detectionsOutside: Transform<S, Event>[] = insiders.map(
          ([insider, f]: [string, Transform<S>]): Transform<S, Event> =>
            onOutside(`#${insider}`, (state) => removeInsideEl(insider)(f(state)))
        )
        return handleUsing(detectionsOutside)(state, event)
      },
    },
  },
})

// -----------------------------------------------------------------------------

const mouseDownSubscriptionAction = <S, P>(state: State<S>, _props?: Payload<P>): State<S> | EffectfulState<S> => {
  const handlerMap = get(["uy", "mousedownHandlers"])(state) as Record<string, Transform<S, Event>>
  const handlers = Object.values(handlerMap)
  const transitioner = handleUsing(handlers)
  return [state, onMouseDown(transitioner)]
}

const runMouseDownSubscription = <S>(dispatch: Dispatch<S>): void => {
  window.requestAnimationFrame(() => dispatch(mouseDownSubscriptionAction))
}

// -----------------------------------------------------------------------------

// TODO:
// - have the `uy` config part of the state be managed by the app that uses `uy`
// const uy = (path: Path)

export const uyAppConfig = <S>(config: App<S>): App<S> => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: (_state: State<S>): Subscriber<S>[] => [
    runMouseDownSubscription,
  ],
  init: freshState(config.init),
})
