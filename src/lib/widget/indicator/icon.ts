import { ClassProp, VNode, h } from "hyperapp"

export { icon }

// -----------------------------------------------------------------------------

const icon = <S>(classProp: ClassProp): VNode<S> =>
  h("i", { class: ["uwye-indicator uwye-icon", classProp] })
