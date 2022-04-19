import { ClassProp, MaybeVNode, VNode, h } from "hyperapp"

export type { PopperOptions }
export { popper }

// -----------------------------------------------------------------------------

type PopperOptions =
  | string
  | {
      [_: string]: unknown
      id: string
      class?: ClassProp
      disabled?: boolean
    }

const popper = <S>(options: PopperOptions, contents: MaybeVNode<S> | readonly MaybeVNode<S>[]): VNode<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { id, disabled, ...etc } = props
  return h("div", {
    id,
    ...etc,
    class: ["uy-popper", etc.class, { disabled }],
  }, contents)
}
