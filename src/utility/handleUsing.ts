import type { Payload, Transform } from "hyperapp"
import type { Transition } from "./unite"

import { unite } from "./unite"

// Invokes a collection of event handlers for the same event.
export const handleUsing = <S>(handlers: Transform<S, Event>[]) => {
  return (state: Transition<S>, event?: Payload<Event>): Transition<S> => {
    return handlers.reduce((s, t) => unite(t, s, event), state)
  }
}
