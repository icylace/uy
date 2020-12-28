import type { Focus } from "eyepiece"
import type { ClassProp, State, Transform, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { TableRow } from "../container/table"
import type { CheckboxData, CheckboxValue } from "./checkbox"

import { get } from "eyepiece"
import { div } from "ntml"
import { table } from "../container/table"
import { checkbox } from "./checkbox"

export type ChecklistItem = {
  id: string
  selected: CheckboxData
}

export type ChecklistData = {
  items: ChecklistItem[]
}

export type ChecklistOptions<S> = {
  renderLabel: (_: Content<S>) => VDOM<S>
  onchange?: Transform<S, CheckboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshChecklist = (items: ChecklistItem[]): ChecklistData => ({ items })

const checklist = <S>(options: ChecklistOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { renderLabel, onchange, disabled, ...etc } = options

    const item = (x: ChecklistItem, i: number): TableRow<S> => [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [checkbox({ label: renderLabel(x.id), onchange, disabled })(focus, i, "selected")(state)],
      ],
    ]

    return div(
      { ...etc, class: ["uy-checklist", { disabled }, etc.class] },
      [table({ disabled }, get<ChecklistData>(focus)(state).items.map(item))],
    )
  }
}

export { checklist, freshChecklist }
