import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { ContainerView, Renderer } from "../types"

import { box } from "./box"

const ui = <S>(f: Renderer<S>) => (views: View<S>[]) => (state: State<S>): VDOM<S> =>
  f (views.map ((g: View<S>): VDOM<S> => g (state)))

const column = ui (box ("uy-column"))
const panel = <S>(classProp: ClassProp): ContainerView<S> => ui (box (classProp))
const row = ui (box ("uy-row"))

export { column, panel, row, ui }
