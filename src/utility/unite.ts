import type { EffectfulState, Payload, State, Transform } from "hyperapp"

// A transition is a state transformation with any effects to run.
export type Transition<S> = State<S> | EffectfulState<S>

const unite = <S>(t: Transform<S>, s: Transition<S>, p?: Payload<any>): Transition<S> => {
  if (!Array.isArray(s)) {
    return t(s, p)
  }

  const [state, ...effects] = s
  const transition = t(state, p)

  if (!Array.isArray(transition)) {
    return [transition, ...effects]
  }

  const [newState, ...newEffects] = transition
  return [newState, ...effects, ...newEffects]
}

export { unite }
