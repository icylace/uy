import type { Stuff } from "ntml"

// export type Stuff<S> = number | string | MaybeVNode<S> | ((..._: any[]) => VNode<S>)
// export type Content<S> = Stuff<S> | Stuff<S>[]
// export type ValidatedPropList<S, C> = CustomPayloads<S, C> & Props<S>

export type ContentView<S> = Stuff<S> | ((state: S) => Stuff<S>)

export const render = <S>(view: ContentView<S>) => (state: S): Stuff<S> =>
  typeof view === "function" ? view(state) : view
