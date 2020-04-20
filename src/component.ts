import { get, set } from "./utility/shadesHelper"

// component :: (Options -> [String] -> Object -> VNode) -> Object -> [String] -> State -> VNode
const component = (f: Function) => (options: object) => (path: string[]) => (state: object): object => {
  const data = get(path)(state)
  const update = set([...path, "value"])
  return f({ update, path, ...options })(data)
}

export { component }
