import { h } from "hyperapp"

// spinner :: ComponentOptions -> VNode
const spinner = (props: any): any => {
  return h("span", { class: "uy-indicator uy-spinner", ...props })
}

export { spinner }
