import type { ClassProp, State, VDOM } from "hyperapp"
import type { Stuff } from "ntml"
import type { TableCell } from "../../wireless/container/table"
import type { Wiring } from "../../component"
import type { TextboxData } from "./textbox"

import { div } from "ntml"
import { adjust } from "../../utility/adjust"
import { exclude } from "../../utility/exclude"
import { table } from "../../wireless/container/table"
import { button } from "../../wireless/control/button"
import { cancelButton } from "../../wireless/control/cancelButton"
import { textbox, freshTextbox } from "./textbox"

export type ListData = {
  items: string[]
}

export type ListOptions<S>
  = Stuff<S>[]
  | {
    class?: ClassProp
    disabled?: boolean
    headers?: Stuff<S>[]
  }

const freshList = (items: string[]): ListData => {
  return { items }
}

const list = <S>(options: ListOptions<S> = {}) => (wiring: Wiring<ListData, S>) => (state: State<S>): VDOM<S> => {
  const props = Array.isArray(options) ? { headers: options } : options
  const { disabled, headers, ...etc } = props
  const r = wiring.get(state)

  const item = (value: string, i: number): TableCell<S>[] => {
    const textWiring: Wiring<TextboxData, S> = {
      get: (_state) => freshTextbox(value),
      set: (state, x) => wiring.set(state, { ...r, items: adjust(i, x, r.items) }),
    }
    return [
      textbox<S>({ disabled })(textWiring)(state),
      cancelButton({
        disabled,
        onclick: (state: State<S>): State<S> => {
          return wiring.set(state, { ...r, items: exclude(i, r.items) })
        },
      }),
    ]
  }

  const grower: TableCell<S>[] = [
    [
      { class: "uy-list-adder", colspan: 2 },
      button({
        disabled,
        label: "+ Add",
        onclick: (state: State<S>): State<S> => {
          return wiring.set(state, { ...r, items: [...r.items, ""] })
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
