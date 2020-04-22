import { h } from "hyperapp"
import { component } from "../component"
import { rawTable } from "../container/table"
import { set } from "../utility/shadesHelper"
import { rawCheckbox } from "./checkbox"

// freshList :: [String] -> Object
const freshChecklist = (items: string[]): any => ({ items })

// updateItem :: [String] -> Int -> State -> String -> State
const updateItem = (path: string[]) => (i: number) => (state: any, value: string): any => {
  return set([...path, "items", i])(value)(state)
}

// rawChecklist :: ChecklistOptions -> Object -> VNode
const rawChecklist = ({ disabled, locked, path, render, ...etc }: any) => (data: any): any => {
  const item = (x: any, i: number) =>
    [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [
          rawCheckbox({
            disabled,
            locked,
            label: render(x.id),
            update: updateItem(path)(i),
          })({ value: x.selected }),
        ],
      ],
    ]
  return h("div", {
    ...etc,
    class: {
      disabled,
      locked,
      "uy-container": true,
      "uy-checklist": true,
      [etc.class]: !!etc.class,
    },
  }, [
    rawTable({
      disabled,
      locked,
      headers: null,
      orderColumn: null,
      sortDescending: null,
    })({ rows: data.items.map(item) }),
  ])
}

// checklist :: ChecklistOptions -> [String] -> State -> VNode
const checklist = component(rawChecklist)

export { checklist, freshChecklist, rawChecklist }
