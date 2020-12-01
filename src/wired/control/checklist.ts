import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../../component"
import type { TableRow } from "../../wireless/container/table"
import type { CheckboxData } from "./checkbox"

import { div } from "ntml"
import { table } from "../../wireless/container/table"
import { checkbox, freshCheckbox } from "./checkbox"

export type ChecklistItem = {
  id: string
  selected: CheckboxData
}

export type ChecklistData = {
  items: ChecklistItem[]
}

export type ChecklistOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  renderLabel: (_: Content<S>) => VDOM<S>
}

const freshChecklist = (items: ChecklistItem[]): ChecklistData => {
  return { items }
}

const checklist = <S>(options: ChecklistOptions<S>) => (wiring: Wiring<ChecklistData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, renderLabel, ...etc } = options
  const x = wiring.get(state)

  const item = (x: ChecklistItem, i: number): TableRow<S> => {
    const itemWiring: Wiring<CheckboxData, S> = ({
      get: (state) => wiring.get(state).items[i].selected,
      set: (state, x) => {
        const r = wiring.get(state)
        return wiring.set(state, {
          ...r,
          items: [
            ...r.items.slice(0, i),
            { ...r.items[i], selected: freshCheckbox(x.value) },
            ...r.items.slice(i + 1),
          ],
        })
      },
    })

    return [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [checkbox({ label: renderLabel(x.id), disabled })(itemWiring)(state)],
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
