import type {
  Dispatch,
  Payload,
  State,
  StateWithEffects,
  Transform,
  // Subscriber,
} from "hyperapp"

import { handleUsing } from "./handleUsing"
import { onMouseDown } from "./onMouseDown"

// -----------------------------------------------------------------------------

// const freshState = <S extends UyHelper>(state: State<S>): State<S> => ({
//   ...state,
//   uyInsiders: new Map(),
//   uyMousedownHandlers: new Map([
//     [
//       "detectOutsideAction",
//       (state: State<S>, event: Payload<Event>): State<S> | EffectfulState<S> => {
//         const detectionsOutside: Transform<S, Event>[] = Array.from(state.uyInsiders).map(
//           ([insider, f]: [string, Transform<S>]): Transform<S, Event> => {
//             return onOutside(`#${insider}`, (state) => uyInsidersRemove("uyInsiders")(insider, f(state)))
//           }
//         )
//         return handleUsing(detectionsOutside)(state, event)
//       },
//     ],
//   ]),
// })

// -----------------------------------------------------------------------------

export type Handlers<S> = (state: State<S>) => Transform<S, Event>[]

const uyMouseDownSubscriptionAction = <S>(getHandlers: Handlers<S>) =>
  (state: State<S>, _props?: Payload<unknown>): StateWithEffects<S> =>
    [state, onMouseDown(handleUsing(getHandlers(state)))]

const uyMouseDownSubscription = <S>(getHandlers: Handlers<S>) => (dispatch: Dispatch<S>): void => {
  window.requestAnimationFrame(() => dispatch(uyMouseDownSubscriptionAction(getHandlers)))
}

export { uyMouseDownSubscription }
