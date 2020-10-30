import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { TableRow } from "../container/table"
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
  const x = wiring.get(state)

  const item = (x: ChecklistItem, i: number): TableRow<S> => {
    const itemWiring: Wiring<S, CheckboxData> = ({
      get: (state) => ({ value: wiring.get(state).items[i].selected }),
      mod: (state, _f) => state,
      set: (state, x) => {
        const r = wiring.get(state)
        return wiring.set(state, {
          ...r,
          items: [
            ...r.items.slice(0, i),
            { ...r.items[i], selected: x.value },
            ...r.items.slice(i + 1,),
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

  return div(
    {
      ...etc,
      class: cc(["uy-container uy-checklist", { locked, disabled }, etc.class]),
    },
    [table({ disabled, locked }, x.items.map(item))],
  )
}

export { checklist, freshChecklist }
