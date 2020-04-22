import { h } from "/web_modules/hyperapp.js"
import { compose } from "../utility/utility"

type ClassAttr = object | string

// box :: ClassAttr -> [VNode] -> VNode
const box = (classAttr: ClassAttr) => (contents: any[]): any => {
  return h("div", { class: classAttr }, contents)
}

// ui :: ([VNode] -> VNode) -> [(State -> VNode)] -> State -> VNode
const ui = (f: Function) => (gs: Function[]) => (state: any): any => {
  return f(gs.map(g => g(state)))
}

// column :: [Function] -> State -> VNode
const column = ui(box("uy-column"))

// panel :: ClassAttr -> [Function] -> State -> VNode
const panel = compose(ui)(box)

// row :: [Function] -> State -> VNode
const row = ui(box("uy-row"))

export { box, column, panel, row, ui }
