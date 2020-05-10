import { VNode, h } from "hyperapp"
import { box } from "./ui"

// field :: (ComponentOptions -> String -> State -> VNode) -> String -> ComponentOptions -> [String] -> State -> VNode
const field = (f: any) => (title: string) => ({ disabled, locked, ...etc }: any) => (path: string[]) => (state: any): VNode => {
  return box ("uy-container uy-field") ([
    h ("label", {
      ...etc,
      class: {
        disabled,
        locked,
        [etc.class]: !!etc.class,
      },
    }, [title, f ({ disabled, locked, ...etc }) (path) (state)]),
  ])
}

export { field }
