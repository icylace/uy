import type { StateForm, Transform } from "./types"

import { unite } from "./unite"

// Invokes a collection of event handlers for the same event.
export const handleUsing = <S>(handlers: Transform<S, Event>[]) =>
  (state: StateForm<S>, event: Event): StateForm<S> =>
    handlers.reduce((s, t) => unite(t, s, event), state)
