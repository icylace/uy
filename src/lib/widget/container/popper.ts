import { ClassProp, VNode, h } from "hyperapp"
import type { Content } from "hyperapplicable"

export type { PopperOptions }
export { popper }

// -----------------------------------------------------------------------------

type PopperOptions = string | PopperFullOptions
type PopperFullOptions = {
  [_: string]: unknown
  id: string
  class?: ClassProp
  disabled?: boolean
}

const popper = <S>(options: PopperOptions, content: Content<S>): VNode<S> => {
  const props = typeof options === "string" ? { id: options } : options
  const { id, disabled, ...etc } = props
  return h("div", {
    id,
    ...etc,
    class: ["uwye-popper", etc.class, { disabled }],
  }, content)
}
