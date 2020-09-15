import type {
  ClassProp,
  Payload,
  State,
  Transition,
  VDOM,
  View,
} from "hyperapp"
import type { Path } from "./utility/shadesHelper"

export type ComponentOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

export type Component<S, D = unknown> =
  (_: ComponentOptions) => (_: Path) => (_: State<S>) => VDOM<S, D>

export type ContainerView<S, D = unknown> = (_: View<S, D>[]) => View<S, D>

export type Transform<S, P = unknown, P2 = unknown, D = unknown> =
  (state: State<S>, props?: Payload<P>) => Transition<S, P2, D>
