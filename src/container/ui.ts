import { h } from "hyperapp"
import { compose } from "../utility/utility"

type ClassAttr = object | string

// box :: ClassAttr -> [VNode] -> VNode
const box = (classAttr: ClassAttr) => (contents: any[]): any =>
  h("div", { class: classAttr }, contents)

// ui :: ([VNode] -> VNode) -> [(State -> VNode)] -> State -> VNode
const ui = (f: Function) => (gs: Function[]) => (state: any): any =>
  f(gs.map((g: Function) => g(state)))

// column :: [Function] -> State -> VNode
const column = ui(box("uy-column"))

// panel :: ClassAttr -> [Function] -> State -> VNode
const panel = compose(ui)(box)

// row :: [Function] -> State -> VNode
const row = ui(box("uy-row"))

export { box, column, panel, row, ui }
