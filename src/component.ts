import { State, VDOM } from "hyperapp"
import { get, set } from "./utility/shadesHelper"

// TODO:
// type Component = (_: ComponentOptions) => (path: Path) => <S>(state: State<S>) => VDOM

// component :: (Options -> [String] -> Object -> VNode) -> Object -> [String] -> State -> VNode
const component = (f: Function) => (options: object) => (path: string[]) => <S>(state: State<S>): VDOM => {
  const data = get (path) (state)
  const update = (state: State<S>, value: any): any => set ([...path, "value"]) (value) (state)
  return f ({ update, path, ...options }) (data)
}

export { component }
