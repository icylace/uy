import type { ClassProp, VDOM, VNode } from "hyperapp"
import type { ContainerView, Renderer } from "../types"

import { h } from "hyperapp"

const box = (classProp: ClassProp) => (contents: VNode): VDOM => {
  return h ("div", { class: classProp }, contents)
}

const ui = (f: Renderer): ContainerView => views => (state): VDOM => f (views.map (g => g (state)))

const column: ContainerView = ui (box ("uy-column"))

const panel = (classProp: ClassProp): ContainerView => ui (box (classProp))

const row: ContainerView = ui (box ("uy-row"))

export { box, column, panel, row, ui }
