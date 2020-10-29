import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { TableCell } from "../container/table"
import type { Wiring } from "../component"

import cc from "classcat"
import { div } from "ntml"
import { table } from "../container/table"
import { exclude } from "../utility/utility"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { textbox } from "./textbox"

export type ListData = {
  items: string[]
}

export type ListOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  headers?: Content<S>[]
  locked?: boolean
  wiring: Wiring<S, ListData>
}

const freshList = (items: string[]): ListData => {
  return { items }
}

const addItem = <S>(wiring: Wiring<S, ListData>) => (state: State<S>): State<S> => {
  const r = wiring.data(state)
  return wiring.update(state, { ...r, items: [...r.items, ""] })
}

const updateItem = <S>(wiring: Wiring<S, ListData>, i: number) => (state: State<S>, value: Payload<any>): State<S> => {
  const r = wiring.data(state)
  return wiring.update(state, {
    ...r,
    items: [
      ...r.items.slice(0, i),
      value,
      ...r.items.slice(i + 1),
    ],
  })
}

const removeItem = <S>(wiring: Wiring<S, ListData>, i: number) => (state: State<S>): State<S> => {
  const r = wiring.data(state)
  return wiring.update(state, { ...r, items: exclude(i, r.items) })
}

const list = <S>(options: ListOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, headers, wiring, ...etc } = options
  const r = wiring.data(state)

  const item = (value: string, i: number): TableCell<S>[] => {
    const textWiring = {
      data: () => ({ value }),
      update: () => ({ ...wiring.update(), value })
    }
    return [
      textbox({
        disabled,
        locked,
        // update: updateItem(wiring, i),
        wiring: textWiring,
      })(state),
      cancelButton<S>({
        disabled,
        locked,
        handler: removeItem(wiring, i),
      }),
    ]
  }

  const grower: TableCell<S>[] = [
    [
      { class: "uy-list-adder", colspan: 2 },
      button<S>({
        disabled,
        locked,
        label: "+ Add",
        handler: addItem(r),
      }),
    ],
  ]

  return div(
    {
      ...etc,
      class: cc(["uy-control uy-list", { locked, disabled }, etc.class]),
    },
    [
      table(
        { disabled, locked, headers, sortDescending: false, },
        [...r.items.map(item), grower]
      ),
    ],
  )
}

export { freshList, list }
