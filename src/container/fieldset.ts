import { h } from "hyperapp"
import { ui } from "./ui"

// @ts-ignore
const { S } = window.sanctuary

// rawFieldset :: ComponentOptions -> [VNode] -> VNode
const rawFieldset = ({ disabled, locked, label, ...etc }: any) => (contents: any[]): any =>
  h("fieldset", {
    disabled,
    ...etc,
    class: {
      disabled,
      locked,
      "uy-fieldset": true,
      [etc.class]: !!etc.class,
    },
  }, label ? [h("legend", {}, [label]), ...contents] : contents)

// fieldset :: ComponentOptions -> [AnyFunction] -> State -> VNode
const fieldset = S.compose(ui)(rawFieldset)

export { fieldset }
