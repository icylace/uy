import type { ClassProp, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { TableCell } from "../container/table"
import type { Wiring } from "../component"
import type { TextboxData } from "./textbox"

import { div } from "ntml"
import { table } from "../container/table"
import { adjust, exclude } from "../utility/utility"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { textbox, freshTextbox } from "./textbox"

export type ListData = {
  items: string[]
}

export type ListOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  headers?: Content<S>[]
}

const freshList = (items: string[]): ListData => {
  return { items }
}

const list = <S>(options: ListOptions<S>) => (wiring: Wiring<ListData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, headers, ...etc } = options
  const r = wiring.get(state)

  const item = (value: string, i: number): TableCell<S>[] => {
    const textWiring: Wiring<TextboxData, S> = {
      get: (_state) => freshTextbox(value),
      mod: (state, _f) => state,
      set: (state, x) => wiring.mod(state, (r) => ({
        ...r,
        items: adjust(i, x, r.items),
      })),
    }
    return [
      textbox<S>({ disabled })(textWiring)(state),
      cancelButton<S>({
        disabled,
        handler: (state: State<S>): State<S> => {
          return wiring.mod(state, (r) => ({ ...r, items: exclude(i, r.items) }))
        },
      }),
    ]
  }

  const grower: TableCell<S>[] = [
    [
      { class: "uy-list-adder", colspan: 2 },
      button<S>({
        disabled,
        label: "+ Add",
        handler: (state: State<S>): State<S> => {
          return wiring.mod(state, (r) => ({ ...r, items: [...r.items, ""] }))
        },
      }),
    ],
  ]

  return div(
    {
      ...etc,
      class: ["uy-control uy-list", { disabled }, etc.class],
    },
    [
      table(
        { disabled, headers, sortDescending: false, },
        [...r.items.map(item), grower]
      ),
    ],
  )
}

export { freshList, list }
