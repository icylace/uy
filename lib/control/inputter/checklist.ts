import type { Focus } from "eyepiece"
import type { Action, ClassProp, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"
import type { TableRow } from "../container/table"
import type { CheckboxData, CheckboxValue } from "./checkbox"

import { get } from "eyepiece"
import { h } from "hyperapp"
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
  renderLabel: (_: string) => Content<S>
  onchange?: Action<S, CheckboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshChecklist = (items: ChecklistItem[]): ChecklistData => ({ items })

const checklist = <S>(options: ChecklistOptions<S>) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { renderLabel, onchange, disabled, ...etc } = options

    const item = (x: ChecklistItem, i: number): TableRow<S> => [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [
          checkbox({
            label: renderLabel(x.id),
            onchange,
            disabled,
          })(focus, i, "selected")(state),
        ],
      ],
    ]

    return h("div", {
      ...etc,
      class: ["uy-checklist", { disabled }, etc.class],
    }, [
      table({ disabled }, get<ChecklistData>(focus)(state).items.map(item)),
    ])
  }
}

export { checklist, freshChecklist }
