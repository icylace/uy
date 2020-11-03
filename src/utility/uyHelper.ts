// TODO:

const foo = undefined

export { foo }

// import type {
//   App,
//   Dispatch,
//   EffectfulState,
//   Payload,
//   State,
//   Transform,
//   Subscriber,
// } from "hyperapp"

// import { handleUsing, onMouseDown, onOutside } from "./hyperappHelper"
// import { delist } from "./utility"

// // -----------------------------------------------------------------------------

// type UyHelper = {
//   uy: {
//     insiders: Record<string, any>
//     mousedownHandlers: Record<string, Transform<any, Event>>[]
//   }
// }

// // -----------------------------------------------------------------------------

// export const addInsideEl = <S extends UyHelper>(id: string, f: Transform<S>) => (state: State<S>): State<S> => {
//   return {
//     ...state,
//     uy: {
//       ...state.uy,
//       insiders: {
//         ...state.uy.insiders,
//         [id]: f,
//       },
//     },
//   }
// }

// export const removeInsideEl = <S extends UyHelper>(id: string, state: State<S>): State<S> => {
//   return {
//     ...state,
//     uy: {
//       ...state.uy,
//       insiders: delist(id)(state.uy.insiders),
//     },
//   }
// }

// // -----------------------------------------------------------------------------

// const freshState = <S extends UyHelper>(state: State<S>): State<S> => ({
//   ...state,
//   uy: {
//     insiders: {},
//     mousedownHandlers: {
//       detectOutsideAction: (state: State<S>, event: Event): State<S> | EffectfulState<S> => {
//         // TODO:
//         // - switch to using a Map object instead in order to guarantee order
//         const insiders: [string, Transform<S>][] =
//           Object.entries(state.uy.insiders ?? {})
//         const detectionsOutside: Transform<S, Event>[] = insiders.map(
//           ([insider, f]: [string, Transform<S>]): Transform<S, Event> => {
//             return onOutside(`#${insider}`, (state) => removeInsideEl(insider, f(state)))
//           }
//         )
//         return handleUsing(detectionsOutside)(state, event)
//       },
//     },
//   },
// })

// // -----------------------------------------------------------------------------

// const mouseDownSubscriptionAction = <S extends UyHelper, P>(state: State<S>, _props?: Payload<P>): State<S> | EffectfulState<S> => {
//   const handlerMap = state.uy.mousedownHandlers as Record<string, Transform<S, Event>>
//   const handlers = Object.values(handlerMap)
//   const transitioner = handleUsing(handlers)
//   return [state, onMouseDown(transitioner)]
// }

// const runMouseDownSubscription = <S extends UyHelper>(dispatch: Dispatch<S>): void => {
//   window.requestAnimationFrame(() => dispatch(mouseDownSubscriptionAction))
// }

// // -----------------------------------------------------------------------------

// // TODO:
// // - have the `uy` config part of the state be managed by the app that uses `uy`
// // const uy = (path: Path)

// export const uyAppConfig = <S extends UyHelper>(config: App<S>): App<S> => ({
//   ...config,
//   // TODO: account for any subscriptions from `config`
//   subscriptions: (_state: State<S>): Subscriber<S>[] => [
//     runMouseDownSubscription,
//   ],
//   init: freshState(config.init),
// })
