import type { ContentView } from "../../utility/hyperappHelper/content"
import { ClassProp, VNode, h } from "hyperapp"
import { using } from "../../utility/using"

export { panel }

// -----------------------------------------------------------------------------

const panel = <S>(classProp: ClassProp, views: readonly ContentView<S>[]) => (state: S): VNode<S> =>
  h("div", { class: classProp }, using(views)(state))
