import { Action, ClassProp, MaybeVNode, VNode, h, text } from "hyperapp"
import { Focus, get } from "eyepiece"
import { TableRow, table } from "../container/table"
import { CheckboxData, CheckboxValue, checkbox } from "./checkbox"

export type { ChecklistData, ChecklistItem, ChecklistOptions }
export { checklist, freshChecklist }

// -----------------------------------------------------------------------------

type ChecklistItem = {
  id: string
  selected: CheckboxData
}

type ChecklistData = {
  items: ChecklistItem[]
}

type ChecklistOptions<S> = {
  renderLabel: (_: MaybeVNode<S> | readonly MaybeVNode<S>[]) => MaybeVNode<S> | readonly MaybeVNode<S>[]
  updater?: Action<S, CheckboxValue>
  class?: ClassProp
  disabled?: boolean
}

const freshChecklist = (items: ChecklistItem[]): ChecklistData =>
  ({ items })

const checklist = <S>(options: ChecklistOptions<S>) => (...focus: Focus) => (state: S): VNode<S> => {
  const { renderLabel, updater, disabled, ...etc } = options

  const item = (x: ChecklistItem, i: number): TableRow<S> => [
    [
      { class: { "uy-horizontal": x.id === "other" } },
      [
        checkbox({
          label: renderLabel(text(x.id)),
          updater,
          disabled,
        })(focus, i, "selected")(state),
      ],
    ],
  ]

  return h(
    "div",
    { ...etc, class: ["uy-checklist", etc.class, { disabled }] },
    table({ disabled }, get<ChecklistData>(focus)(state).items.map(item))(state)
  )
}
