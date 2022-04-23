import { ClassProp, VNode, h } from "hyperapp"

export type { BusyOptions }
export { busy }

// -----------------------------------------------------------------------------

type BusyOptions = {
  class?: ClassProp
  disabled?: boolean
}

const busy = <S>(props: BusyOptions = {}): VNode<S> =>
  h("span", { ...props, class: ["uy-indicator uy-busy", props.class] })
