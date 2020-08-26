import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { ContainerView, Renderer } from "../types"

import { box } from "./box"

const ui = (f: Renderer) => (views: View[]) => <S>(state: State<S>): VDOM =>
  f (views.map ((g: View): VDOM => g (state)))

const column: ContainerView = ui (box ("uy-column"))
const panel = (classProp: ClassProp): ContainerView => ui (box (classProp))
const row: ContainerView = ui (box ("uy-row"))

export { column, panel, row, ui }
