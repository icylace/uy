// TODO:
// - (?) `list` -> `textlist`

import { Action, ClassProp, MaybeVNode, VNode, h, text } from "hyperapp"
import { Focus, get, set } from "eyepiece"
import { exclude } from "wtv"
import { TableCell, table } from "../container/table"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { TextboxData, TextboxValue, textbox, freshTextbox } from "./textbox"

export type { ListData, ListOptions }
export { freshList, list }

// -----------------------------------------------------------------------------

type ListData = {
  items: TextboxData[]
}

type ListOptions<S> =
  | MaybeVNode<S>[]
  | {
      headers?: MaybeVNode<S>[]
      onchange?: Action<S, TextboxValue>
      class?: ClassProp
      disabled?: boolean
    }

const freshList = (items: string[]): ListData =>
  ({ items: items.map(freshTextbox) })

const list = <S>(options: ListOptions<S> = {}) => (...focus: Focus) => (state: S): VNode<S> => {
  const props = Array.isArray(options) ? { headers: options } : options
  const { headers, onchange, disabled, ...etc } = props
  const xr = get<ListData>(focus)(state)

  const item = (_value: TextboxData, i: number): TableCell<S>[] => [
    textbox({ onchange, disabled })(focus, "items", i)(state),
    cancelButton({
      disabled,
      onclick: (state) => {
        const nextState = set(focus, "items")(exclude(i))(state)
        return onchange ? onchange(nextState, "") : nextState
      },
    }),
  ]

  const grower: TableCell<S>[] = [
    [
      { class: "uy-list-adder", colspan: 2 },
      button({
        label: text("+ Add"),
        disabled,
        onclick: (state) => {
          const nextState = set(focus, "items")(
            (xs: TextboxData[]) => [...xs, freshTextbox("")]
          )(state)
          return onchange ? onchange(nextState, "") : nextState
        },
      }),
    ],
  ]

  return h("div", {
    ...etc,
    class: ["uy-control uy-list", etc.class, { disabled }],
  }, [
    table({ headers, disabled, sortDescending: false }, [
      ...xr.items.map(item),
      grower,
    ])(state),
  ])
}
