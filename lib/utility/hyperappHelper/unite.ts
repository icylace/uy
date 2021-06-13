import type { Effect } from "hyperapp"

type StateFormat<S, P = any> = S | [state: S, ...effects: Effect<S, P>[]]

// A transform carries out the transition from one state to another.
type Transform<S, P = any> = (state: StateFormat<S>, payload: P) => StateFormat<S>

export const unite = <S, P = any>(
  transform: Transform<S>,
  stateForm: StateFormat<S>,
  payload?: P
): StateFormat<S> => {
  if (!Array.isArray(stateForm)) {
    return transform(stateForm, payload)
  }

  const [state, ...effects] = stateForm
  const nextStateForm = transform(state, payload)

  if (!Array.isArray(nextStateForm)) {
    return [nextStateForm, ...effects]
  }

  const [nextState, ...nextEffects] = nextStateForm
  return [nextState, ...effects, ...nextEffects]
}
