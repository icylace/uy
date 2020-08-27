import type { State, VDOM } from "hyperapp"
import type { Component, ComponentOptions, Content, Path } from "../types"

import cc from "classcat"
import { label } from "ntml"
import { box } from "./box"

export const field = (f: Component) =>
  (title: Content) =>
    ({ disabled, locked, ...etc }: ComponentOptions) =>
      (path: Path) =>
        <S>(state: State<S>): VDOM =>
          box ("uy-container uy-field") ([
            label (
              { ...etc, class: cc ([{ locked, disabled }, etc.class]) },
              [title, f ({ disabled, locked, ...etc }) (path) (state)],
            ),
          ])
