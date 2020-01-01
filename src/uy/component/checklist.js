import { h } from "../hyperappHelper.js"
import { asArray, box, classAttr } from "../utility.js"
import { checkbox } from "./checkbox.js"
import { table } from "./table.js"

const checklist = ({ disabled, show, updater, ...etc }, items) => {
  const item = (x, i) => [
    [
      x.id === "other" ? { class: "my-horizontal" } : null,
      [
        checkbox(
          {
            disabled,
            content: show(x.id),
            updater: (state, selected) => updater(state, { ...x, selected }),
          },
          x.selected,
        ),
      ],
    ],
  ]
  return h("div", { class: "my-checklist", ...etc }, [table({ disabled, ...etc }, asArray(items).map(item))])
}

// checklistField :: {a} -> String -> VNode
const checklistField = ({ disabled, title, ...etc }, value) =>
  box("uy-field", [h("label", { class: classAttr({ disabled }) }, [title, checklist({ disabled, ...etc }, value)])])

export { checklist, checklistField }
