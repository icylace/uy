import type { ClassProp, State, VDOM, View } from "hyperapp"
import type { Content } from "ntml"
import type { ContainerView } from "../types"

import { box } from "./box"

export type Renderer<S> = (_: Content<S>[]) => VDOM<S>

const ui = <S>(f: Renderer<S>) => (views: View<S>[]) => (state: State<S>): VDOM<S> =>
  f(views.map((g: View<S>): VDOM<S> => g(state)))

const column = ui((x) => box("uy-column", x))
const panel = <S>(classProp: ClassProp): ContainerView<S> => ui((x) => box(classProp, x))
const row = ui((x) => box("uy-row", x))

export { column, panel, row, ui }
