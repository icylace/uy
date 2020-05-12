import { ClassProp, VDOM, VNode, View, h } from "hyperapp"

type Renderer = (content: VNode) => VDOM

const box = (classProp: ClassProp) => (contents: VNode): VDOM => {
  return h ("div", { class: classProp }, contents)
}

type ui = (f: Renderer) => (views: View[]) => View
const ui: ui = f => views => (state): VDOM => f (views.map (g => g (state)))

type column = (views: View[]) => View
const column: column = ui (box ("uy-column"))

type panel = (classProp: ClassProp) => (views: View[]) => View
const panel: panel = classProp => ui (box (classProp))

type row = (views: View[]) => View
const row = ui (box ("uy-row"))

export { box, column, panel, row, ui }
