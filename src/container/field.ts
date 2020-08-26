import type { State, VDOM } from "hyperapp"
import type { ComponentOptions, Content, Path } from "../types"

import { label } from "ntml"
import { box } from "./box"

type Component = (_: ComponentOptions) => (_: Path) => <S>(_: State<S>) => VDOM

const field = (f: Component) =>
  (title: Content) =>
    ({ disabled, locked, ...etc }: ComponentOptions) =>
      (path: Path) =>
        <S>(state: State<S>): VDOM =>
          box ("uy-container uy-field") ([
            label ({
              ...etc,
              class: {
                disabled,
                locked,
                // TODO:
                // - handle all class prop variations
                [etc.class as string]: !!etc.class,
              },
            }, [
              title,
              f ({ disabled, locked, ...etc }) (path) (state),
            ]),
          ])

export { field }
