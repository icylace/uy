import { h } from "hyperapp"
import { box } from "./ui"

// field :: (ComponentOptions -> String -> State -> VNode) -> String -> ComponentOptions -> [String] -> VNode
const field = (f: Function) => (title: String) => ({ disabled, locked, ...etc }: any) => (path: string[]) => (state: any): any =>
  box("uy-container uy-field", [
    h("label", {
      ...etc,
      class: {
        disabled,
        locked,
        [etc.class]: !!etc.class,
      },
    }, [title, ...f({ disabled, locked, ...etc })(path)(state)]),
  ])

export { field }
