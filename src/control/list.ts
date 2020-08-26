import type { State, VDOM } from "hyperapp"
import type { Content, Control, ControlOptions, Path } from "../types"

import { div } from "ntml"
import { exclude } from "../utility/utility"
import { get, set } from "../utility/shadesHelper"
import { component } from "../component"
import { rawTable } from "../container/table"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { rawTextbox } from "./textbox"

export type ListOptions = ControlOptions & {
  headers?: Content[]
  path: Path
}

export type ListData = {
  items: string[]
}

const freshList = (items: string[]): ListData => ({ items })

const addItem = (path: Path) => (data: ListData) => <S>(state: State<S>): State<S> =>
  set ([...path, "items"]) ([...data.items, ""]) (state)

const updateItem = (path: Path) => (i: number) => <S>(state: State<S>, value: string): State<S> =>
  set ([...path, "items", i]) (value) (state)

const removeItem = (path: Path) => (i: number) => <S>(state: State<S>): State<S> =>
  set ([...path, "items"]) (
    exclude (i) (get ([...path, "items"]) (state)),
  ) (state)

const rawList = ({ disabled, locked, headers, path, ...etc }: ListOptions) => (data: ListData): VDOM => {
  const item = (x: any, i: number): any => [
    rawTextbox ({ disabled, locked, update: updateItem (path) (i) }) (
      { value: x },
    ),
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
      class: {
        disabled,
        locked,
        "uy-control": true,
        "uy-list": true,
        [etc.class]: !!etc.class,
      },
    },
    [
      rawTable ({
        disabled,
        headers,
        locked,
        sortDescending: false,
      }) ({ rows: [...data.items.map (item), grower] }),
    ],
  )
}

const list: Control = component (rawList)

export { freshList, list }
