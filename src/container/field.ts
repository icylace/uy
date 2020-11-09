import type { State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { ComponentOptions } from "../types"

import cc from "classcat"
import { label } from "ntml"
import { box } from "./box"

export type FieldOptions = {
  [_: string]: unknown
  disabled?: boolean
  locked?: boolean
}

export type Component<S> = (options: ComponentOptions) => (state: State<S>) => VDOM<S>

const field = <S>(title: Content<S>, f: Component<S>, options: FieldOptions) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, ...etc } = options
  return box("uy-field", [
    label(
      {
        ...etc,
        class: cc([{ locked, disabled }, etc.class]),
      },
      [
        title,
        f({ disabled, locked, ...etc })(state),
      ],
    ),
  ])
}

export { field }
