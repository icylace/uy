import { ClassProp, VNode, h } from "hyperapp"
import type { ContentView } from "hyperapplicable"
import { using } from "../../utility/using"

export { panel }

// -----------------------------------------------------------------------------

const panel = <S>(classProp: ClassProp, views: readonly ContentView<S>[]) => (state: S): VNode<S> =>
  h("div", { class: classProp }, using(views)(state))
