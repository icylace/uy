import { State, VDOM, h } from "hyperapp"
import { Path } from "../types"
import { component } from "../component"
import { rawTable } from "../container/table"
import { get, set } from "../utility/shadesHelper"
import { exclude } from "../utility/utility"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { rawTextbox } from "./textbox"

// freshList :: [String] -> Object
const freshList = (items: string[]): any => ({ items })

// addItem :: [String] -> ListData -> State -> State
const addItem = (path: Path) => (data: any) => <S>(state: State<S>): State<S> => {
  return set ([...path, "items"]) ([...data.items, ""]) (state)
}

// updateItem :: [String] -> Int -> State -> State -> String -> State
const updateItem = (path: Path) => (i: number) => <S>(state: State<S>, value: string): State<S> => {
  return set ([...path, "items", i]) (value) (state)
}

// removeItem :: [String] -> Int -> State -> State
const removeItem = (path: Path) => (i: number) => <S>(state: State<S>): State<S> => {
  return set ([...path, "items"]) (exclude (i) (get ([...path, "items"]) (state))) (state)
}

// rawList :: ListOptions -> Object -> VNode
const rawList = ({ disabled, locked, headers, path, ...etc }: any) => (data: any): VDOM => {
  const item = (x: any, i: number): any =>
    [
      rawTextbox ({ disabled, locked, update: updateItem (path) (i) }) ({ value: x }),
      cancelButton ({ disabled, locked, update: removeItem (path) (i) }),
    ]

  const grower =
    [
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

  return h (
    "div",
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
        orderColumn: null,
        sortDescending: false,
      }) ({ rows: [...data.items.map (item), grower] }),
    ]
  )
}

// list :: ListOptions -> [String] -> State -> VNode
const list = component (rawList)

export { freshList, list }
