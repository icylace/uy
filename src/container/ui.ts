import { h } from "hyperapp"

// box :: ClassAttr -> [VNode] -> VNode
const box = (classAttr: object | string, contents: any[]): any => h("div", { class: classAttr }, contents)

// TODO:
// ui :: ([VNode] -> VNode) -> [(State -> VNode)] -> State -> VNode
const ui = (f: any) => (gs: any) => (state: any): any => f(gs.map((g: Function): any => g(state)))

// column :: [AnyFunction] -> State -> VNode
const column = ui((xs: any[]): any => box("uy-column", xs))

// panel :: ClassAttr -> [AnyFunction] -> State -> VNode
const panel = (classAttr: object | string) => (contents: any[]) => (state: any) =>
  ui((xs: any[]): any => box(classAttr, xs))(contents)(state)

// row :: [AnyFunction] -> State -> VNode
const row = ui((xs: any[]): any => box("uy-row", xs))

export { box, column, panel, row, ui }
