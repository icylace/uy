import type { ClassProp, State } from "hyperapp"
import type { Content } from "ntml"

export type ComponentOptions = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
}

export type ContentView<S> = (state: State<S>) => Content<S>
