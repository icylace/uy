import type { ClassProp, State, VDOM } from "hyperapp"
import type { Path } from "./utility/shadesHelper"

export type ComponentOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  locked: boolean
}

export type Component<S> = (props: ComponentOptions, path: Path) => (state: State<S>) => VDOM<S>
