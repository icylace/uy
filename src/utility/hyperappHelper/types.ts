import type { Action, CustomPayloads, Dispatch, Effect, MaybeVNode } from "hyperapp"

export type Props<T, S, P> = CustomPayloads<S, P> & T

export type ActionWithPayload<S, P = any> = [action: Action<S, P>, payload: P]

// An effecter is where side effects and any additional dispatching may occur.
export type Effecter<S, P> = (dispatch: Dispatch<S>, payload: P) => void | Promise<void>

export type Reaction<S, P = any> = Action<S, P> | ActionWithPayload<S, P>

export type StateFormat<S, P = any> = S | StateWithEffects<S, P>

// State can be associated with a list of effects to run.
export type StateWithEffects<S, P = any> = [state: S, ...effects: Effect<S, P>[]]

// A subscriber reacts to subscription updates.
export type Subscriber<S, P> = (dispatch: Dispatch<S>, payload: P) => void | Unsubscribe

// An unsubscribe function cleans up a canceled subscription.
export type Unsubscribe = () => void

// A transform carries out the transition from one state to another.
export type Transform<S, P = any> = (state: StateFormat<S>, payload: P) => StateFormat<S>

export type ViewComponent<S, Props> = <X>(props: CustomPayloads<S, X> & Props, content: MaybeVNode<S>[]) => MaybeVNode<S>
// Credit: https://github.com/jorgebucaran/hyperapp/discussions/1052#discussioncomment-630744
