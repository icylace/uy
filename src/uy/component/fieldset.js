import { h } from "../hyperappHelper.js"
import { box } from "../utility.js"

// fieldset :: {a} -> String -> VNode
const fieldset = ({ disabled, title, ...etc }, content) =>
  h("fieldset", { disabled, class: "uy-fieldset", ...etc }, [
    title ? h("legend", {}, title) : null,
    box("uy-row", content),
  ])

export { fieldset }
