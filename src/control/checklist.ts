import type { Payload, State, VDOM } from "hyperapp"
import type { ComponentOptions, Control, Path, Renderer } from "../types"
import type { TableCell } from "../container/table"

import cc from "classcat"
import { div } from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { rawTable } from "../container/table"
import { rawCheckbox } from "./checkbox"

export type ChecklistOptions = ComponentOptions & {
  path: Path
  render: Renderer
}

type ChecklistItem = {
  id: string
  selected: boolean
}

type Checklist = {
  items: ChecklistItem[]
}

// TODO:
const freshChecklist = (items: ChecklistItem[]): Checklist => ({ items })
// const freshChecklist = (items: string[]): any => ({ items })

const updateItem = (path: Path) => (i: number) => <S, P>(state: State<S>, value: Payload<P>): State<S> =>
  set ([...path, "items", i]) (value) (state)

const rawChecklist = ({ disabled, locked, path, render, ...etc }: ChecklistOptions) => (data: Checklist): VDOM => {
  const item = (x: ChecklistItem, i: number): TableCell[] =>
    [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [
          rawCheckbox ({
            disabled,
            locked,
            label: render (x.id),
            update: updateItem (path) (i),
          }) ({ value: x.selected }),
        ],
      ],
    ]

  return div (
    {
      ...etc,
      class: cc (["uy-container uy-checklist", { locked, disabled }, etc.class]),
    },
    [rawTable ({ disabled, locked }) ({ rows: data.items.map (item) })],
  )
}

const checklist: Control = component (rawChecklist)

export { checklist, freshChecklist, rawChecklist }
