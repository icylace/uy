import type { StateFormat, Transform } from "hyperapplicable"

export { onOutside }

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
const onOutside = <S>(selector: string, action: Transform<S, unknown>) => {
  return (state: S, event: Event): StateFormat<S> => {
    const el = document.querySelector(selector)
    if (!el || el.contains(event.target as Element)) return state
    return action(state, event)
  }
}
