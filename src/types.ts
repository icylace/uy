import type { ClassProp, Payload, State, Transition, VDOM, View } from "hyperapp"
import type { Contents } from "ntml"
import type { Path } from "./utility/shadesHelper"

export type ComponentOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

export type ControlOptions<S, P> = ComponentOptions & {
  update: Transform<S, P>
}

export type Component<S> = (_: ComponentOptions) => (_: Path) => (_: State<S>) => VDOM<S>
export type ContainerView<S> = (_: View<S>[]) => View<S>
export type Control<S, P> = (_: ControlOptions<S, P>) => (_: Path) => (_: State<S>) => VDOM<S>
export type Renderer<S> = (_: Contents<S>) => VDOM<S>
export type Transform<S, P> = (state: State<S>, props?: Payload<P>) => Transition<S>
