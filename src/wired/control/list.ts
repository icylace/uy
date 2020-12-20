import type { Focus } from "eyepiece"
import type { ClassProp, State, VDOM } from "hyperapp"
import type { Stuff } from "ntml"
import type { TableCell } from "../../wireless/container/table"
import type { TextboxData } from "./textbox"

import { get, set } from "eyepiece"
import { div } from "ntml"
import { exclude } from "../../utility/exclude"
import { table } from "../../wireless/container/table"
import { button } from "../../wireless/control/button"
import { cancelButton } from "../../wireless/control/cancelButton"
import { textbox, freshTextbox } from "./textbox"

export type ListData = {
  items: TextboxData[]
}

export type ListOptions<S>
  = Stuff<S>[]
  | {
    headers?: Stuff<S>[]
    class?: ClassProp
    disabled?: boolean
  }

const freshList = (items: string[]): ListData =>
  ({ items: items.map(freshTextbox) })

const list = <S>(options: ListOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = Array.isArray(options) ? { headers: options } : options
    const { disabled, headers, ...etc } = props
    const xr = get<ListData>(focus)(state)

    const item = (_value: TextboxData, i: number): TableCell<S>[] => {
      return [
        textbox<S>({ disabled })(focus, "items", i)(state),
        cancelButton({
          disabled,
          onclick: (state: State<S>): State<S> =>
            set<State<S>>(focus, "items")((xs: TextboxData[]) => exclude(i, xs))(state),
        }),
      ]
    }

    const grower: TableCell<S>[] = [
      [
        { class: "uy-list-adder", colspan: 2 },
        button({
          disabled,
          label: "+ Add",
          onclick: (state: State<S>): State<S> =>
            set<State<S>>(focus)(
              (xr: ListData): ListData =>
                ({ ...xr, items: [...xr.items, freshTextbox("")] })
            )(state),
        }),
      ],
    ]

    return div(
      { ...etc, class: ["uy-control uy-list", { disabled }, etc.class] },
      [
        table(
          { disabled, headers, sortDescending: false, },
          [...xr.items.map(item), grower]
        ),
      ],
    )
  }
}

export { freshList, list }
