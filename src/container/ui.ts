import { VNode, h } from "hyperapp"

type ClassAttr = object | string

// box :: ClassAttr -> [VNode] -> VNode
const box = (classAttr: ClassAttr) => (contents: VNode[]): VNode => {
  return h ("div", { class: classAttr }, contents)
}

// ui :: ([VNode] -> VNode) -> [(State -> VNode)] -> State -> VNode
const ui = (f: Function) => (gs: Function[]) => (state: any): VNode => {
  return f (gs.map (g => g (state)))
}

// column :: [Function] -> State -> VNode
const column = ui (box ("uy-column"))

// panel :: ClassAttr -> [Function] -> State -> VNode
const panel = (classAttr: any): Function => ui (box (classAttr))

// row :: [Function] -> State -> VNode
const row = ui (box ("uy-row"))

export { box, column, panel, row, ui }
