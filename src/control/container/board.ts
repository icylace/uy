import type { Props, VNode } from "hyperapp"
import type { ContentView } from "../../utility/hyperappHelper/render"
import type { TableOptions } from "./table"

import { render } from "../../utility/hyperappHelper/render"
import { table } from "./table"

export type BoardCell<S> = ContentView<S> | [Props<S>, ContentView<S>]
export type BoardRow<S> = BoardCell<S>[]

const cellHasProps = <S>(cell: BoardCell<S>): cell is [Props<S>, ContentView<S>] =>
  Array.isArray(cell)

export const board = <S>(options: TableOptions<S> = {}, rows: BoardRow<S>[]) => {
  return (state: S): VNode<S> => {
    return table(options, rows.map(
      (row) => row.map(
        (cell) => cellHasProps(cell)
          ? [cell[0], render(cell[1])(state)]
          : render(cell)(state)
      )
    ))
  }
}
