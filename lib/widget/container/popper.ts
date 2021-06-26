import type { ClassProp, MaybeVNode, VNode } from "hyperapp"

import { h } from "hyperapp"

export type PopperOptions =
  | string
  | {
    [_: string]: unknown
    id: string
    class?: ClassProp
    disabled?: boolean
  }

export const popper = <S>(options: PopperOptions, contents: MaybeVNode<S> | readonly MaybeVNode<S>[]): VNode<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { id, disabled, ...etc } = props
  return h("div", {
    id,
    ...etc,
    class: ["uy-popper", etc.class, { disabled }],
  }, contents)
}
