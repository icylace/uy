import type { State, VDOM } from "hyperapp"
import type { ComponentOptions } from "./types"
import type { Path } from "./utility/shadesHelper"

import { get, set } from "./utility/shadesHelper"

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

export { component }
