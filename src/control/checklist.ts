import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Path } from "../utility/shadesHelper"
import type { TableData, TableRow } from "../container/table"

import cc from "classcat"
import { div } from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { rawTable } from "../container/table"
import { rawCheckbox } from "./checkbox"

export type ChecklistOptions<S> = {
  class?: ClassProp
  disabled: boolean
  locked: boolean
  path: Path
  render: (_: Content<S> | Content<S>[]) => VDOM<S>
}

export type ChecklistItem = {
  id: string
  selected: boolean
}

export type Checklist = {
  items: ChecklistItem[]
}

const freshChecklist = (items: ChecklistItem[]): Checklist =>
  ({ items })

const updateItem = (path: Path) => (i: number) => <S, P>(state: State<S>, value: Payload<P>): State<S> =>
  set([...path, "items", i])(value)(state)

const rawChecklist =
  <S>({ disabled, locked, path, render, ...etc }: ChecklistOptions<S>) =>
    (data: Checklist): VDOM<S> => {
      const item = (x: ChecklistItem, i: number): TableRow<S> =>
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

      const tableData: TableData<S> = {
        rows: data.items.map(item),
      }

      return div(
        {
          ...etc,
          class: cc(["uy-container uy-checklist", { locked, disabled }, etc.class]),
        },
        [rawTable<S>({ disabled, locked })(tableData)],
      )
    }

const checklist = component(rawChecklist)

export { checklist, freshChecklist, rawChecklist }
