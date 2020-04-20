import { get, set } from "./lens"

// @ts-ignore
const { S } = window.sanctuary

// etch :: StrMap Bool -> String
const etch = S.pipe([S.pairs, S.filter(S.snd), S.map(S.fst), S.joinWith(" ")])

// TODO:
// const glam = def ("glam :: StrMap Bool -> String") (
//   S.pipe ([S.pairs, S.filter (S.snd), S.map (S.fst), S.joinWith (" ")])
// )

// -----------------------------------------------------------------------------

// component :: (Options -> [String] -> Object -> VNode) -> Object -> [String] -> State -> VNode
const component = (f: Function) => (options: object) => (path: string[]) => (state: object): object => {
  const data = get(path)(state)
  const update = set([...path, "value"])
  return f({ update, path, ...options })(data)
}

// -----------------------------------------------------------------------------

export { component, etch }
