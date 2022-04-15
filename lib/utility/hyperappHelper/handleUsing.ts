import type { StateForm, Transform } from "./types"
import { unite } from "./unite"

export { handleUsing }

// -----------------------------------------------------------------------------

// Invokes a collection of event handlers for the same event.
const handleUsing = <S>(handlers: Transform<S, Event>[]) =>
  (state: StateForm<S>, event: Event): StateForm<S> =>
    handlers.reduce((s, t) => unite(t, s, event), state)
