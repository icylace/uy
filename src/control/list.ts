import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { TableCell } from "../container/table"
import type { Wiring } from "../component"

import cc from "classcat"
import { div } from "ntml"
import { exclude } from "../utility/utility"
import { get, set } from "../utility/shadesHelper"
import { freshTable, table } from "../container/table"
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

const addItem = (data: ListData) => <S>(state: State<S>): State<S> => {
  const xs = wiring.data(state).items
  return wiring.update(state, [...xs, ""])
  // {
  //   ...state,
  //   items: [...state.items, ""],
  //   set([...path, "items"])([...data.items, ""])(state)
  // // return set([...path, "items"])([...data.items, ""])(state)
}

const updateItem = (i: number) => <S, P>(state: State<S>, value: Payload<P>): State<S> => {
  return set([...path, "items", i])(value)(state)
}

const removeItem = (i: number) => <S>(state: State<S>): State<S> => {
  return set([...path, "items"])(
    exclude(i, get([...path, "items"])(state) as string[]),
  )(state)
}

const list = <S>(options: ListOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, headers, wiring, ...etc } = options
  const x = wiring.data(state)

  const item = (value: string, i: number): TableCell<S>[] => {
    const textWiring = {
      data: () => ({ value }),
      update: () => ({ ...wiring.update(), value })
    }
    return [
      textbox({
        disabled,
        locked,
        // update: updateItem(path, i),
        wiring: textWiring,
      }),
      cancelButton<S>({ disabled, locked, handler: removeItem(path, i) }),
    ]
  }

  const grower: TableCell<S>[] = [
    [
      { class: "uy-list-adder", colspan: 2 },
      button<S>({
        disabled,
        locked,
        label: "+ Add",
        handler: addItem(x),
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
        { disabled, headers, locked, sortDescending: false, },
        freshTable([...x.items.map(item), grower])
      ),
    ],
  )
}

export { freshList, list }
