import type {
  ClassProp,
  // Payload,
  State,
  // Transition,
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

export type Component<S> = (_: ComponentOptions) => (_: Path) => (_: State<S>) => VDOM<S>
export type ContainerView<S> = (_: View<S>[]) => View<S>
// export type Transform<S, P = unknown> = (state: State<S>, props?: Payload<P>) => Transition<S>
