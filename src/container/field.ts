import type { State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Path } from "../utility/shadesHelper"
import type { ComponentOptions } from "../types"

import cc from "classcat"
import { label } from "ntml"
import { box } from "./box"

export type FieldOptions = {
  [_: string]: unknown
  disabled?: boolean
  locked?: boolean
}

export type Component<S> = (props: ComponentOptions, path: Path) => (state: State<S>) => VDOM<S>

const field = <S>(title: Content<S>, f: Component<S>, props: FieldOptions, path: Path) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, ...etc } = props
  return box("uy-container uy-field", [
    label(
      {
        ...etc,
        class: cc([{ locked, disabled }, etc.class]),
      },
      [
        title,
        f({ disabled, locked, ...etc }, path)(state),
      ],
    ),
  ])
}

export { field }
