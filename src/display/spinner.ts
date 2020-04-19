import { h } from "hyperapp"

// spinner :: ComponentOptions -> VNode
const spinner = (props: object): any => h("span", { class: "uy-indicator uy-spinner", ...props })

export { spinner }
