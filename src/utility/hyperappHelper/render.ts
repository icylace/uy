import type { State } from "hyperapp"
import type { Stuff } from "ntml"

export type ContentView<S> = Stuff<S> | ((state: State<S>) => Stuff<S>)

export const render = <S>(view: ContentView<S>) => (state: State<S>): Stuff<S> =>
  typeof view === "function" ? view(state) : view
