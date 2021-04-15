import type {
  Action,
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
//       (state: State<S>, event: Payload<Event>): StateFormat<S> => {
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

const uyMouseDownSubscriberAction = <S>(getHandlers: Handlers<S>) =>
  (state: State<S>, _props?: Payload<unknown>): StateWithEffects<S, Action<S, Event>> =>
    [state, onMouseDown(handleUsing(getHandlers(state)))]

const uyMouseDownSubscription = <S>(getHandlers: Handlers<S>) => {
  return (dispatch: Dispatch<S>): void => {
    window.requestAnimationFrame(
      () => dispatch(uyMouseDownSubscriberAction(getHandlers))
    )
  }
}

export { uyMouseDownSubscription }
