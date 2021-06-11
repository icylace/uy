import type { Props, VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"
import type { TableOptions } from "./table"

import { table } from "./table"

export type BoardCell<S> = View<S> | [Props<S>, View<S>]
export type BoardRow<S> = BoardCell<S>[]

const cellHasProps = <S>(cell: BoardCell<S>): cell is [Props<S>, View<S>] =>
  Array.isArray(cell)

export const board = <S>(options: TableOptions<S> = {}, rows: BoardRow<S>[]) => {
  return (state: S): VNode<S> => {
    return table(options, rows.map(
      (row) => row.map(
        (cell) => cellHasProps(cell)
          ? [cell[0], cell[1](state)]
          : cell(state)
      )
    ))
  }
}
