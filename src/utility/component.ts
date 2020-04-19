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

// TODO:

// https://github.com/jorgebucaran/hyperapp/blob/f30e70e77513948d2a1286ea6509b4e0c1de8999/lib/dom/src/index.js

// var fx = function(a) {
//   return function(b) {
//     return [a, b]
//   }
// }

// export var focus = fx(function(_, id) {
//   document.getElementById(id).focus()
// })

// export var blur = fx(function(_, id) {
//   document.getElementById(id).blur()
// })

// -----------------------------------------------------------------------------

// component :: (Options -> [String] -> Object -> VNode) -> Object -> [String] -> State -> VNode
const component = (f: Function) => (options: object) => (path: string[]) => (state: object): object => {
  const data = get(path)(state)
  const update = set([...path, "value"])
  return f({ update, path, ...options })(data)
}

// -----------------------------------------------------------------------------

export { component, etch }
