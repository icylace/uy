import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { TableRow } from "../container/table"
import type { CheckboxData } from "./checkbox"

import { div } from "ntml"
import { table } from "../container/table"
import { checkbox } from "./checkbox"

export type ChecklistItem = {
  id: string
  selected: boolean
}

export type ChecklistData = {
  items: ChecklistItem[]
}

export type ChecklistOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  render: (_: Content<S> | Content<S>[]) => VDOM<S>
}

const freshChecklist = (items: ChecklistItem[]): ChecklistData => {
  return { items }
}

const checklist = <S>(options: ChecklistOptions<S>) => (wiring: Wiring<S, ChecklistData>) => (state: State<S>): VDOM<S> => {
  const { disabled, render, ...etc } = options
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
        [checkbox({ disabled, label: render(x.id) })(itemWiring)(state)],
      ],
    ]
  }

  return div(
    {
      ...etc,
      class: ["uy-checklist", { disabled }, etc.class],
    },
    [table({ disabled }, x.items.map(item))],
  )
}

export { checklist, freshChecklist }
