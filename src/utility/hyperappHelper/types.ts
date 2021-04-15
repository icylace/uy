import type { Action, ActionWithPayload, StateWithEffects } from "hyperapp"

// A transform carries out the transition from one state to another.
export type Transform<S, P = any> = (
  state: S | StateWithEffects<S>,
  payload: P
) => S | StateWithEffects<S>

export type Reaction<S, P = any> = Action<S, P> | ActionWithPayload<S, P>
