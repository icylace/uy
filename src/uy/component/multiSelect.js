// TODO:

import { h } from "../hyperappHelper.js"
import { box, classAttr } from "../utility.js"
import { checkbox } from "./checkbox.js"

// multiSelect :: {a} -> b -> VNode
const multiSelect = ({ options, title, ...etc }, values) =>
  h("div", { class: "uy-control uy-multiSelect", ...etc }, [
    box("uy-input uy-multiSelect-values", [h("p", {}, values.map(x => options[x]).join(", "))]),

    box(
      "uy-multiSelect-options",
      Object.entries(options).map(([x, title]) =>
        box("uy-multiSlelect-option", [
          checkbox(
            {
              updater: (state, checked) => {
                // TODO:
                return state
              },
            },
            values.includes(x) ? title : null,
          ),
        ]),
      ),
    ),
  ])

// multiSelectField :: {a} -> String -> VNode
const multiSelectField = ({ disabled, title, ...etc }, value) =>
  box("uy-field", [h("label", { class: classAttr({ disabled }) }, [title, multiSelect({ disabled, ...etc }, value)])])

export { multiSelect, multiSelectField }
