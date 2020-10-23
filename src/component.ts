import type { State, VDOM } from "hyperapp"
import type { ComponentOptions } from "./types"
import type { Path } from "./utility/shadesHelper"

import { get, set } from "./utility/shadesHelper"

// -----------------------------------------------------------------------------

export type Wiring<R extends Record<string, any>, D> = Readonly<{
  data: (r: R) => D
  update: (r: R, x: D) => R
}>

const wire = <R extends Record<string, any>, D>
  (prop: string, context?: Wiring<R, D>): Wiring<R, D> => ({
    data: (r) => context
      ? (context.data(r) as Record<string, any>)[prop]
      : r[prop],
    update: (r, x) => context
      ? context.update(r, { ...context.data(r), [prop]: x })
      : { ...r, [prop]: x },
  })

// -----------------------------------------------------------------------------

// // TODO:
// type Component<S> = (_: ComponentOptions, __: Path) => (_: State<S>) => VDOM<S>

// component :: (ComponentOptions -> Path -> Object -> VDOM) -> ComponentOptions -> Path -> State -> VDOM
const component = <S>(f: Function) => (options: ComponentOptions) => (path: Path) => {
  return (state: State<S>): VDOM<S> => {
    const data = get(path)(state)
    const update = (state: State<S>, value: any): State<S> => {
      return set([...path, "value"])(value)(state)
    }
    return f({ update, path, ...options }, data)
  }
}

export { component, wire }
