import type { State, VDOM } from "hyperapp"
import type { ComponentOptions } from "./types"
import type { Path } from "./utility/shadesHelper"

import { get, set } from "./utility/shadesHelper"

// // TODO:
// type Component = (_: ComponentOptions) => (_: Path) => <S>(_: State<S>) => VDOM

// component :: (ComponentOptions -> Path -> Object -> VDOM) -> ComponentOptions -> Path -> State -> VDOM
const component = (f: Function) =>
  (options: ComponentOptions) =>
    (path: Path) =>
      <S>(state: State<S>): VDOM<S> => {
        const data = get (path) (state)
        const update = (state: State<S>, value: any): any =>
          set ([...path, "value"]) (value) (state)
        return f ({ update, path, ...options }) (data)
      }

export { component }
