import type { Payload, Transform, StateFormat } from "hyperapp"

import { unite } from "../hyperappHelper/unite"

// Invokes a collection of event handlers for the same event.
export const handleUsing = <S>(handlers: Transform<S, Event>[]) =>
  (state: StateFormat<S>, event?: Payload<Event>): StateFormat<S> =>
    handlers.reduce((s, t) => unite(t, s, event), state)
