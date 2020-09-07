import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Transform } from "../types"
import type { TableCell } from "../container/table"
import type { Path } from "../utility/shadesHelper"

import cc from "classcat"
import { div } from "ntml"
import { exclude } from "../utility/utility"
import { get, set } from "../utility/shadesHelper"
import { component } from "../component"
import { rawTable } from "../container/table"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { rawTextbox } from "./textbox"

export type ListOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  headers?: Content<S>[]
  locked: boolean
  path: Path
}

export type ListData = {
  items: string[]
}

const freshList = (items: string[]): ListData =>
  ({ items })

const addItem = (path: Path) => (data: ListData) => <S>(state: State<S>): State<S> =>
  set ([...path, "items"]) ([...data.items, ""]) (state)

const updateItem = (path: Path) => (i: number) => <S>(state: State<S>, value: Payload): State<S> =>
  set ([...path, "items", i]) (value) (state)

const removeItem = (path: Path) => (i: number) => <S>(state: State<S>): State<S> =>
  set ([...path, "items"]) (
    exclude (i) (get ([...path, "items"]) (state) as string[]),
  ) (state)

const rawList =
  <S>({ disabled, locked, headers, path, ...etc }: ListOptions<S>) =>
    (data: ListData): VDOM<S> => {
      const item = (x: any, i: number): TableCell<S>[] => [
        rawTextbox
          ({ disabled, locked, update: updateItem (path) (i) })
          ({ value: x }),
        cancelButton ({ disabled, locked, update: removeItem (path) (i) }),
      ]

      const grower = [
        [
          { class: "uy-list-adder", colspan: 2 },
          button ({
            disabled,
            locked,
            label: "+ Add",
            update: addItem (path) (data),
          }),
        ],
      ]

      return div (
        {
          ...etc,
          class: cc (["uy-control uy-list", { locked, disabled }, etc.class]),
        },
        [
          rawTable ({
            disabled,
            headers,
            locked,
            sortDescending: false,
          }) ({ rows: [...data.items.map (item), grower] }),
        ],
      ) as VDOM<S>
    }

const list = component (rawList)

export { freshList, list }
