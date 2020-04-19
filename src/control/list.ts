import { h } from "hyperapp"
import { rawTable } from "../container/table"
import { component } from "../utility/component"
import { get, set } from "../utility/lens"
import { exclude } from "../utility/utility"
import { button } from "./button"
import { cancelButton } from "./cancelButton"
import { rawTextbox } from "./textbox"

// freshList :: [String] -> Object
const freshList = (items: string[]): any => ({ items })

// addItem :: [String] -> ListData -> Event -> State -> State
const addItem = (path: string[]) => (data: any) => (_: any): any => {
  return set([...path, "items"])([...data.items, ""])
}

// updateItem :: [String] -> Int -> String -> State -> State
const updateItem = (path: string[]) => (i: number) => (value: string): any => {
  return set([...path, "items", i])(value)
}

// removeItem :: [String] -> Int -> Event -> State -> State
const removeItem = (path: string[]) => (i: number) => (_: any) => (state: any): any => {
  return set([...path, "items"])(exclude(i)(get([...path, "items"])(state)))(state)
}

// rawList :: ListOptions -> Object -> VNode
const rawList = ({ disabled, locked, headers, path, ...etc }: any) => (data: any): any => {
  const item = (x: any, i: number): any =>
    [
      rawTextbox({ disabled, locked, update: updateItem(path)(i) })({ value: x }),
      cancelButton({ disabled, locked, update: removeItem(path)(i) }),
    ]

  const grower =
    [
      [
        { class: "uy-list-adder", colspan: 2 },
        button({
          disabled,
          locked,
          label: "+ Add",
          update: addItem(path)(data),
        }),
      ],
    ]

  return h(
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
      rawTable({
        disabled,
        headers,
        locked,
        orderColumn: null,
        sortDescending: null,
      })({ rows: [...data.items.map(item), grower] }),
    ]
  )
}

// list :: ListOptions -> [String] -> State -> VNode
const list = component(rawList)

export { freshList, list }
