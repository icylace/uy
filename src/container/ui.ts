import type { ClassProp, State, VDOM, View, VNode } from "hyperapp"
import type { ContainerView, Renderer } from "../types"

import { div } from "ntml"

const box = (classProp: ClassProp) =>
  (contents: VNode[]): VDOM => {
    return div ({ class: classProp }, contents)
  }

const ui = (f: Renderer) =>
  (views: View[]) =>
    <S>(state: State<S>): VDOM => {
      return f (views.map ((g) => g (state)))
    }

const column: ContainerView = ui (box ("uy-column"))
const panel = (classProp: ClassProp): ContainerView => ui (box (classProp))
const row: ContainerView = ui (box ("uy-row"))

export { box, column, panel, row, ui }
