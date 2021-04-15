import type { Payload, Transform, State, StateWithEffects } from "hyperapp"

import { unite } from "../hyperappHelper/unite"

// Invokes a collection of event handlers for the same event.
export const handleUsing = <S>(handlers: Transform<S, Event>[]) =>
  (state: State<S> | StateWithEffects<S>, event?: Payload<Event>): State<S> | StateWithEffects<S> =>
    handlers.reduce((s, t) => unite(t, s, event), state)
