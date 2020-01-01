import { h, targetValue } from "../hyperappHelper.js"
import { box } from "../utility.js"

// TODO:

// radios  :: {a} -> b -> VNode
const radios = ({ title, updater, choices, ...etc }, valueSelected) =>
  box("uy-control uy-radios", [
    h("label", {}, [
      title,
      ...Object.entries(choices).map(([value, content]) =>
        h("label", {}, [
          h("input", {
            value,
            class: "uy-input",
            type: "radio",
            checked: value === valueSelected,
            onchange: [updater, targetValue],
            ...etc,
          }),
          content,
        ]),
      ),
    ]),
  ])

// radiosField  :: {a} -> b -> VNode
const radiosField = ({ title, updater, choices, ...etc }, valueSelected) =>
  box("uy-control uy-radios", [
    h("label", {}, [
      title,
      ...Object.entries(choices).map(([value, content]) =>
        h("label", {}, [
          h("input", {
            value,
            class: "uy-input",
            type: "radio",
            checked: value === valueSelected,
            onchange: [updater, targetValue],
            ...etc,
          }),
          content,
        ]),
      ),
    ]),
  ])

export { radios, radiosField }
