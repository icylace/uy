import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"
import type { View } from "hyperapplicable"
import { using } from "wtv"

export { panel }

// -----------------------------------------------------------------------------

const panel =
  <S>(classProp: ClassProp, views: readonly (MaybeVNode<S> | View<S>)[]) =>
    (state: S): VNode<S> =>
      h("div", { class: classProp }, using(views)(state))
