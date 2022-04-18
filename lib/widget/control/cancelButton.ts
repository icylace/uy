// TODO:
// - get rid of this

import { Action, ClassProp, MaybeVNode, VNode, h, text } from "hyperapp"
import { isAction } from "hyperapplicable"

export type { CancelButtonOptions }
export { cancelButton }

// -----------------------------------------------------------------------------

type CancelButtonOptions<S> =
  | Action<S, MouseEvent>
  | {
    onclick: Action<S, MouseEvent>
    label?: MaybeVNode<S> | readonly MaybeVNode<S>[]
    class?: ClassProp
    disabled?: boolean
  }

const cancelButton = <S>(options: CancelButtonOptions<S>): VNode<S> => {
  const props = isAction<S, MouseEvent>(options) ? { onclick: options } : options
  const { label = text("✕"), onclick, disabled, ...etc } = props
  return h("div", { class: ["uy-control uy-cancelButton", etc.class, { disabled }] }, [
    h("button", {
      type: "button",
      onclick,
      disabled,
      ...etc,
    }, label),
  ])
}
