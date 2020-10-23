import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { TableCell } from "../container/table"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { div } from "ntml"
import { exclude } from "../utility/utility"
import { get, set } from "../utility/shadesHelper"
import { rawTable } from "../container/table"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { rawTextbox } from "./textbox"

export type ListOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  headers?: Content<S>[]
  locked?: boolean
  path: Path
}

export type ListData = {
  items: string[]
}

const freshList = (items: string[]): ListData => {
  return { items }
}

const addItem = (path: Path, data: ListData) => {
  return <S>(state: State<S>): State<S> => {
    return set([...path, "items"])([...data.items, ""])(state)
  }
}

const updateItem = (path: Path, i: number) => {
  return <S, P>(state: State<S>, value: Payload<P>): State<S> => {
    return set([...path, "items", i])(value)(state)
  }
}

const removeItem = (path: Path, i: number) => {
  return <S>(state: State<S>): State<S> => {
    return set([...path, "items"])(
      exclude(i, get([...path, "items"])(state) as string[]),
    )(state)
  }
}

const list = <S>(props: ListOptions<S>, data: ListData): VDOM<S> => {
  const { disabled, locked, headers, path, ...etc } = props

  const item = (value: string, i: number): TableCell<S>[] => [
    rawTextbox({ disabled, locked, update: updateItem(path, i) }, { value }),
    cancelButton<S>({ disabled, locked, handler: removeItem(path, i) }),
  ]

  const grower: TableCell<S>[] = [
    [
      { class: "uy-list-adder", colspan: 2 },
      button<S>({
        disabled,
        locked,
        label: "+ Add",
        handler: addItem(path, data),
      }),
    ],
  ]

  return div(
    {
      ...etc,
      class: cc(["uy-control uy-list", { locked, disabled }, etc.class]),
    },
    [
      rawTable(
        { disabled, headers, locked, sortDescending: false, },
        { rows: [...data.items.map(item), grower] }
      ),
    ],
  )
}
export { freshList, list }
