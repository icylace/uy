import type { Props, MaybeVNode, VNode } from "hyperapp"
import type { View } from "../../utility/hyperappHelper/content"
import type { TableOptions } from "./table"

import { table } from "./table"

// TODO:
// - move state stuff into `table` then remove `board`

export type BoardCell<S> = MaybeVNode<S> | View<S> | [Props<S>, MaybeVNode<S> | View<S>]
export type BoardRow<S> = BoardCell<S>[]

const cellHasProps = <S>(cell: BoardCell<S>): cell is [Props<S>, MaybeVNode<S> | View<S>] =>
  Array.isArray(cell)

export const board = <S>(options: TableOptions<S> = {}, rows: BoardRow<S>[]) => {
  return (state: S): VNode<S> => {
    return table(options, rows.map(
      (row) => row.map(
        (cell) => cellHasProps(cell)
          ? [cell[0], typeof cell[1] === "function" ? cell[1](state) : cell[1]]
          : typeof cell === "function" ? cell(state) : cell,
      )
    ))
  }
}
