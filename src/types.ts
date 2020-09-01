import type { ClassProp, Payload, State, VDOM, View } from "hyperapp"
import type { Contents } from "ntml"
import type { Path } from "./utility/shadesHelper"

export type Component = (_: ComponentOptions) => (_: Path) => <S>(_: State<S>) => VDOM
export type ContainerView = (_: View[]) => View
export type Control = (_: ControlOptions) => (_: Path) => <S>(_: State<S>) => VDOM
export type Handler = <S, P>(state: State<S>, payload?: Payload<P>) => State<S>
export type Renderer = (_: Contents) => VDOM

export type ControlData<T> = {
  [_: string]: unknown
  value: T
}

export type ComponentOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

export type ControlOptions = ComponentOptions & {
  update: Handler
}
