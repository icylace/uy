// TODO:
// - get rid of this

import { Action, ClassProp, VNode, h, text } from "hyperapp"
import { Content, isAction } from "hyperapplicable"

export type { CancelButtonOptions }
export { cancelButton }

// -----------------------------------------------------------------------------

type CancelButtonOptions<S> = Action<S, MouseEvent> | CancelButtonFullOptions<S>
type CancelButtonFullOptions<S> = {
  onclick: Action<S, MouseEvent>
  label?: Content<S>
  class?: ClassProp
  disabled?: boolean
}

const cancelButton = <S>(options: CancelButtonOptions<S>): VNode<S> => {
  const props = isAction<S, MouseEvent>(options) ? { onclick: options } : options
  const { label = text("✕"), disabled, ...etc } = props
  return h("div", { class: ["uwye-control uwye-cancelButton", etc.class, { disabled }] }, [
    h("button", { type: "button", disabled, ...etc, }, label),
  ])
}
