import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, VDOM } from "hyperapp"
import type { Stuff } from "ntml"
import type { TableCell } from "../container/table"
import type { TextboxData, TextboxValue } from "./textbox"

import { get, set } from "eyepiece"
import { div } from "ntml"
import { exclude } from "../../utility/exclude"
import { table } from "../container/table"
import { button } from "../button/button"
import { cancelButton } from "../button/cancelButton"
import { textbox, freshTextbox } from "./textbox"

export type ListData = {
  items: TextboxData[]
}

export type ListOptions<S>
  = Stuff<S>[]
  | {
    headers?: Stuff<S>[]
    onchange?: ActionTransform<S, TextboxValue>
    class?: ClassProp
    disabled?: boolean
  }

const freshList = (items: string[]): ListData =>
  ({ items: items.map(freshTextbox) })

const list = <S>(options: ListOptions<S> = {}) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const props = Array.isArray(options) ? { headers: options } : options
    const { headers, onchange, disabled, ...etc } = props
    const xr = get<ListData>(focus)(state)

    const item = (_value: TextboxData, i: number): TableCell<S>[] => [
      textbox<S>({ onchange, disabled })(focus, "items", i)(state),
      cancelButton({
        disabled,
        onclick: (state) => {
          const nextState = set<State<S>>(focus, "items")(exclude(i))(state)
          return onchange ? onchange(nextState) : nextState
        },
      }),
    ]

    const grower: TableCell<S>[] = [
      [
        { class: "uy-list-adder", colspan: 2 },
        button({
          label: "+ Add",
          disabled,
          onclick: (state) => {
            const nextState = set<State<S>>(focus, "items")(
              (xs: TextboxData[]) => [...xs, freshTextbox("")]
            )(state)
            return onchange ? onchange(nextState) : nextState
          },
        }),
      ],
    ]

    return div(
      { ...etc, class: ["uy-control uy-list", { disabled }, etc.class] },
      [
        table(
          { headers, disabled, sortDescending: false, },
          [...xr.items.map(item), grower]
        ),
      ],
    )
  }
}

export { freshList, list }
