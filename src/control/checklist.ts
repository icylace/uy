import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { TableData, TableRow } from "../container/table"
import type { CheckboxData } from "./checkbox"

import cc from "classcat"
import { div } from "ntml"
import { table } from "../container/table"
import { checkbox } from "./checkbox"

export type ChecklistItem = {
  id: string
  selected: boolean
}

export type Checklist = {
  items: ChecklistItem[]
}

export type ChecklistOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  render: (_: Content<S> | Content<S>[]) => VDOM<S>
  wiring: Wiring<S, Checklist>
}

const freshChecklist = (items: ChecklistItem[]): Checklist => {
  return { items }
}

const checklist = <S>(options: ChecklistOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, render, wiring, ...etc } = options
  const x = wiring.data(state)

  const item = (x: ChecklistItem, i: number): TableRow<S> => {
    const itemWiring: Wiring<S, CheckboxData> = ({
      data: (r) => ({ value: wiring.data(r).items[i].selected }),
      update: (r, x) => {
        const xr = wiring.data(r)
        return wiring.update(r, {
          ...xr,
          items: [
            ...xr.items.slice(0, i),
            { ...xr.items[i], selected: x.value },
            ...xr.items.slice(i + 1,),
          ],
        })
      },
    })

    return [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [
          checkbox(
            {
              disabled,
              locked,
              label: render(x.id),
              wiring: itemWiring,
            },
          )(state),
        ],
      ],
    ]
  }

  const tableData: TableData<S> = {
    rows: x.items.map(item),
  }

  return div(
    {
      ...etc,
      class: cc(["uy-container uy-checklist", { locked, disabled }, etc.class]),
    },
    [table({ disabled, locked }, tableData)],
  )
}

export { checklist, freshChecklist }
