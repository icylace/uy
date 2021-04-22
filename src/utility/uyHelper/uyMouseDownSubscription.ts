import type { Action, Dispatch, Subscription } from "hyperapp"
import type { Transform } from "../hyperappHelper/types"

import { handleUsing } from "./handleUsing"

// -----------------------------------------------------------------------------

// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484

const windowListener = <S>(
  name: string,
  action: Action<S, Event>
): Subscription<S, Action<S, Event>> => [
  (dispatch, action) => {
    const listener = (event: Event) => dispatch(action, event)
    window.addEventListener(name, listener)
    return () => window.removeEventListener(name, listener)
  },
  action,
]

const onMouseDown = <S>(action: Action<S, Event>) =>
  windowListener("mousedown", action)

// -----------------------------------------------------------------------------

// const freshState = <S extends UyHelper>(state: S): S => ({
//   ...state,
//   uyInsiders: new Map(),
//   uyMousedownHandlers: new Map([
//     [
//       "detectOutsideAction",
//       (state: S, event: Payload<Event>): StateFormat<S> => {
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

export type Handlers<S> = (state: S) => Transform<S, Event>[]

const uyMouseDownSubscriberAction = <S>(getHandlers: Handlers<S>) => {
  return (state: S, _props: any): [S, Subscription<S, Action<S, Event>>] => {
    const x = onMouseDown(handleUsing(getHandlers(state)))
    return [state, x]
  }
}

// const uyMouseDownSubscriberAction = <S>(getHandlers: Handlers<S>) =>
//   (state: S, _props: any): StateWithEffects<S, Action<S, Event>> =>
//     [state, onMouseDown(handleUsing(getHandlers(state)))]

const uyMouseDownSubscription = <S>(getHandlers: Handlers<S>) => {
  return (dispatch: Dispatch<S>): void => {
    window.requestAnimationFrame(
      () => {
        const x = uyMouseDownSubscriberAction(getHandlers)
        dispatch(x)
      }
    )
  }
}

export { uyMouseDownSubscription }
