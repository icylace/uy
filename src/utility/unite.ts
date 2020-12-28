import type { Payload, StateFormat, Transform } from "hyperapp"

export const unite = <S, P = any>(
  transformation: Transform<S>,
  transition: StateFormat<S>,
  payload?: Payload<P>
): StateFormat<S> => {
  if (!Array.isArray(transition)) {
    return transformation(transition, payload)
  }

  const [state, ...effects] = transition
  const nextTransition = transformation(state, payload)

  if (!Array.isArray(nextTransition)) {
    return [nextTransition, ...effects]
  }

  const [nextState, ...nextEffects] = nextTransition
  return [nextState, ...effects, ...nextEffects]
}
