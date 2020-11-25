import type { EffectfulState, Payload, State, Transform } from "hyperapp"

// A transition is a state transformation with any effects to run.
export type Transition<S> = State<S> | EffectfulState<S>

const unite = <S>(transformation: Transform<S>, transition: Transition<S>, payload?: Payload<any>): Transition<S> => {
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

export { unite }
