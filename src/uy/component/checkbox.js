import { h, targetChecked } from "../hyperappHelper.js"
import { box, classAttr } from "../utility.js"

// checkbox :: {a} -> Bool -> VNode
const checkbox = ({ content, disabled, updater, ...etc }, checked) =>
  box("uy-control uy-checkbox", [
    h("label", { class: classAttr({ disabled }) }, [
      h("input", {
        checked,
        disabled,
        class: "uy-input",
        type: "checkbox",
        onchange: [updater, targetChecked],
        ...etc,
      }),
      content != null ? h("span", {}, content) : null,
    ]),
  ])

// checkboxField :: {a} -> String -> VNode
const checkboxField = ({ disabled, title, ...etc }, value) =>
  box("uy-field", [h("label", { class: classAttr({ disabled }) }, [title, checkbox({ disabled, ...etc }, value)])])

export { checkbox, checkboxField }
