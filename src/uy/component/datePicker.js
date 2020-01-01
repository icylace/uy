import { h, targetValue } from "../hyperappHelper.js"
import { box, classAttr } from "../utility.js"

// datePicker :: {a} -> DateString -> VNode
const datePicker = ({ disabled, title, updater, ...etc }, value) =>
  box("uy-control uy-datePicker", [
    h("label", {}, [
      title,
      h("input", {
        disabled,
        value,
        class: "uy-input",
        type: "date",
        onchange: [updater, targetValue],
        ...etc,
      }),
    ]),
  ])

// datePickerField :: {a} -> String -> VNode
const datePickerField = ({ disabled, title, ...etc }, value) =>
  box("uy-field", [h("label", { class: classAttr({ disabled }) }, [title, datePicker({ disabled, ...etc }, value)])])

export { datePicker, datePickerField }
