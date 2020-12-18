import type { EffectfulState, Payload, State, Transform } from "hyperapp"

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
export const onOutside = <S>(selector: string, action: Transform<S, unknown>) => {
  return (state: State<S>, event?: Payload<Event>): State<S> | EffectfulState<S> => {
    if (!event) return state
    const el = document.querySelector(selector)
    if (!el || el.contains(event.target as Element)) return state
    return action(state, event)
  }
}
