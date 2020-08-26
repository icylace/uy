import type { Payload, PropList, State, VDOM, VNode } from "hyperapp"
import type { Control, ChecklistOptions, Path } from "../types"

import { div } from "ntml"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { rawTable } from "../container/table"
import { rawCheckbox } from "./checkbox"

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
  const item = (x: ChecklistItem, i: number): [[PropList, readonly VNode[]]] =>
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
      class: {
        disabled,
        locked,
        "uy-container": true,
        "uy-checklist": true,
        // TODO:
        // - handle all class prop variations
        [etc.class as string]: !!etc.class,
      },
    },
    [
      rawTable ({
        disabled,
        locked,
        sortDescending: false,
      }) ({ rows: data.items.map (item) }),
    ],
  )
}

const checklist: Control = component (rawChecklist)

export { checklist, freshChecklist, rawChecklist }
