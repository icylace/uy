import { h, targetValue } from "../hyperappHelper.js"
import { box, classAttr } from "../utility.js"

// textbox :: TextBoxOptions -> String -> VNode
const textbox = ({ disabled, locked, updater, ...etc }, value) =>
  box("uy-control uy-textbox", [
    h("input", {
      disabled,
      value,
      class: classAttr({ "uy-input": true, locked }),
      type: "text",
      readonly: locked,
      onchange: [updater, targetValue],
      ...etc,
    }),
  ])

// textboxField :: {a} -> String -> VNode
const textboxField = ({ disabled, title, ...etc }, value) =>
  box("uy-field", [h("label", { class: classAttr({ disabled }) }, [title, textbox({ disabled, ...etc }, value)])])

export { textbox, textboxField }
