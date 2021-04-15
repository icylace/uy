import type { Action, Subscriber, Subscription } from "hyperapp"

// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484

const windowListener = <S>(name: string): Subscriber<S, Action<S, Event>> => {
  return (dispatch, action) => {
    if (!action) return
    const listener = (event: Event) => dispatch(action, event)
    window.addEventListener(name, listener)
    return () => window.removeEventListener(name, listener)
  }
}

const eventFx = (name: string) =>
  <S>(action: Action<S, Event>): Subscription<S, Action<S, Event>> =>
    [windowListener(name), action]

export const onMouseDown = eventFx("mousedown")
