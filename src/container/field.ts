import type { State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Component } from "../types"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { label } from "ntml"
import { box } from "./box"

export type FieldOptions = {
  [_: string]: unknown
  disabled: boolean
  locked: boolean
}

export const field = <S>(f: Component<S>) =>
  (title: Content<S>) =>
    ({ disabled, locked, ...etc }: FieldOptions) =>
      (path: Path) =>
        (state: State<S>): VDOM<S> =>
          box("uy-container uy-field", [
            label(
              { ...etc, class: cc([{ locked, disabled }, etc.class]) },
              [title, f({ disabled, locked, ...etc }, path)(state)],
            ),
          ])
