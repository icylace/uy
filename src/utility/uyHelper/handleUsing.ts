import type { StateFormat, Transform } from "../hyperappHelper/types"

import { unite } from "../hyperappHelper/unite"

// Invokes a collection of event handlers for the same event.
export const handleUsing = <S>(handlers: Transform<S, Event>[]) =>
  (state: StateFormat<S>, event: Event): StateFormat<S> =>
    handlers.reduce((s, t) => unite(t, s, event), state)
