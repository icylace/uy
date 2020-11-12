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

// -----------------------------------------------------------------------------

type UyHelper = {
  [_: string]: any,
  uyInsiders: Map<string, Transform<any>>
  uyMousedownHandlers: Map<string, Transform<any, Event>>
}

// -----------------------------------------------------------------------------

export const uyInsidersAdd = (prop: string) => {
  return <S extends Record<string, any>>(id: string, f: Transform<S>) => {
    return (state: State<S>): State<S> => ({
      ...state,
      [prop]: state[prop].set(id, f),
    })
  }
}

export const addInsideEl = uyInsidersAdd("uyInsiders")

export const uyInsidersRemove = (prop: string) => {
  return <S extends Record<string, any>>(id: string) => {
    return (state: State<S>): State<S> => ({
      ...state,
      [prop]: state[prop].delete(id),
    })
  }
}

export const removeInsideEl = uyInsidersRemove("uyInsiders")

// -----------------------------------------------------------------------------

const freshState = <S extends UyHelper>(state: State<S>): State<S> => ({
  ...state,
  uyInsiders: new Map(),
  uyMousedownHandlers: new Map([
    [
      "detectOutsideAction",
      (state: State<S>, event: Payload<Event>): State<S> | EffectfulState<S> => {
        const detectionsOutside: Transform<S, Event>[] = Array.from(state.uyInsiders).map(
          ([insider, f]: [string, Transform<S>]): Transform<S, Event> => {
            return onOutside(`#${insider}`, (state) => removeInsideEl(insider, f(state)))
          }
        )
        return handleUsing(detectionsOutside)(state, event)
      },
    ],
  ]),
})

// -----------------------------------------------------------------------------

const mouseDownSubscriptionAction = <S extends UyHelper, P>(state: State<S>, _props?: Payload<P>): State<S> | EffectfulState<S> => {
  const handlers = Array.from(state.uyMousedownHandlers).filter(([_, f]) => f)
  const transitioner = handleUsing(handlers)
  return [state, onMouseDown(transitioner)]
}

const runMouseDownSubscription = <S extends UyHelper>(dispatch: Dispatch<S>): void => {
  window.requestAnimationFrame(() => dispatch(mouseDownSubscriptionAction))
}

// -----------------------------------------------------------------------------

// TODO:
// - have the `uy` config part of the state be managed by the app that uses `uy`
// const uy = (path: Path)

export const uyAppConfig = <S extends UyHelper>(config: App<S>): App<S> => ({
  ...config,
  // TODO: account for any subscriptions from `config`
  subscriptions: (_state: State<S>): Subscriber<S>[] => [
    runMouseDownSubscription,
  ],
  init: freshState(config.init),
})
