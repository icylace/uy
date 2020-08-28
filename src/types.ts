import type { ClassProp, Payload, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"

export type Component = (_: ComponentOptions) => (_: Path) => <S>(_: State<S>) => VDOM
export type ContainerView = (_: View[]) => View
export type Control = (_: ControlOptions) => (_: Path) => <S>(_: State<S>) => VDOM
export type Path = string[]
export type Renderer = (_: Content) => VDOM

// TODO:
export type Handler = <S, P>(state: State<S>, payload?: Payload<P>) => State<S>

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

export type LabelledComponentOptions = ComponentOptions & {
  label?: Content
}

export type LabelledControlOptions = ControlOptions & LabelledComponentOptions
