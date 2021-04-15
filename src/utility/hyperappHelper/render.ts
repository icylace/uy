import type { Stuff } from "ntml"

export type ContentView<S> = Stuff<S> | ((state: S) => Stuff<S>)

export const render = <S>(view: ContentView<S>) => (state: S): Stuff<S> =>
  typeof view === "function" ? view(state) : view
