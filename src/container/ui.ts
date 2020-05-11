import { ClassProp, State, VDOM, VNode, View, h } from "hyperapp"

const box = (classProp: ClassProp) => (contents: VNode): VDOM => {
  return h ("div", { class: classProp }, contents)
}

const ui = (f: (_: VNode) => VDOM) => (gs: View[]) => <S>(state: State<S>): VDOM => {
  return f (gs.map (g => g (state)))
}

// column :: [VDOM -> VDOM] -> State -> VDOM
const column = ui (box ("uy-column"))

// panel :: ClassProp -> [Function] -> State -> VDOM
const panel = (classProp: ClassProp): Function => ui (box (classProp))

// row :: [Function] -> State -> VNode
const row = ui (box ("uy-row"))

export { box, column, panel, row, ui }
