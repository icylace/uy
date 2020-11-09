import type { State } from "hyperapp"
import type { Content } from "ntml"

export type ContentView<S> = (state: State<S>) => Content<S>
