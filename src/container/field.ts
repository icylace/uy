import type { State, VDOM } from "hyperapp"
import type { ComponentOptions, Path } from "../types"

import { label } from "../utility/html"
import { box } from "./ui"

type Component = (_: ComponentOptions) => (_: Path) => <S>(_: State<S>) => VDOM;

const field = (f: Component) =>
  (title: string) =>
    ({ disabled, locked, ...etc }: ComponentOptions) =>
      (path: Path) =>
        <S>(state: State<S>): VDOM => {
          return box ("uy-container uy-field") ([
            label ({
              ...etc,
              class: {
                disabled,
                locked,
                [etc.class]: !!etc.class,
              },
            }, [
              title,
              f ({ disabled, locked, ...etc }) (path) (state),
            ]),
          ])
        }

export { field }
