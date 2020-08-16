import type { State, VDOM } from "hyperapp"
import type { Control, ChecklistOptions } from "../types"

import { div } from "../utility/html"
import { set } from "../utility/shadesHelper"
import { component } from "../component"
import { rawTable } from "../container/table"
import { rawCheckbox } from "./checkbox"

const freshChecklist = (items: string[]): any => ({ items })

const updateItem = (path: string[]) => (i: number) => <S>(state: State<S>, value: string): State<S> => {
  return set ([...path, "items", i]) (value) (state)
}

const rawChecklist = ({ disabled, locked, path, render, ...etc }: ChecklistOptions) => (data: any): VDOM => {
  const item = (x: any, i: number): any =>
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
        [etc.class]: !!etc.class,
      },
    },
    [
      rawTable ({
        disabled,
        locked,
        headers: null,
        orderColumn: null,
        sortDescending: false,
      }) ({ rows: data.items.map (item) }),
    ],
  )
}

const checklist: Control = component (rawChecklist)

export { checklist, freshChecklist, rawChecklist }
