import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { ContainerView, Content, Renderer } from "../types"

import { div } from "ntml"

const box = (classProp: ClassProp) => (content: Content): VDOM =>
  div ({ class: classProp }, content)

const ui = (f: Renderer) => (views: View[]) => <S>(state: State<S>): VDOM =>
  f (views.map ((g) => g (state)))

const column: ContainerView = ui (box ("uy-column"))
const panel = (classProp: ClassProp): ContainerView => ui (box (classProp))
const row: ContainerView = ui (box ("uy-row"))

export { box, column, panel, row, ui }
