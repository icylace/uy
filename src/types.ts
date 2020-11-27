import type { State } from "hyperapp"
import type { Stuff } from "ntml"

export type ContentView<S> = (state: State<S>) => Stuff<S>
