import type { Action, Dispatch, EffectDescriptor, Unsubscribe } from "hyperapp"

// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484

const windowListener = (name: string) => {
  return <S>(dispatch: Dispatch<S>, action?: Action<S, Event>): void | Unsubscribe => {
    if (!action) return
    const listener = (event: Event): void => dispatch(action, event)
    window.addEventListener(name, listener)
    return (): void => window.removeEventListener(name, listener)
  }
}

const eventFx = (name: string) => {
  return <S>(action: Action<S, Event>): EffectDescriptor<S, Action<S, Event>> => {
    return [windowListener(name), action]
  }
}

const onMouseDown = eventFx("mousedown")

export { onMouseDown }
