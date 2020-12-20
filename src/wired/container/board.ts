import type { PropList, State, VDOM } from "hyperapp"
import type { ContentView } from "../../types"
import type { TableOptions } from "../../wireless/container/table"

import { table } from "../../wireless/container/table"

export type BoardCell<S> = ContentView<S> | [PropList<S>, ContentView<S>]
export type BoardRow<S> = BoardCell<S>[]

const cellHasProps = <S>(cell: BoardCell<S>): cell is [PropList<S>, ContentView<S>] =>
  Array.isArray(cell)

export const board = <S>(options: TableOptions<S> = {}, rows: BoardRow<S>[]) => (state: State<S>): VDOM<S> =>
  table(options, rows.map(
    (row) => row.map(
      (cell) => cellHasProps(cell)
        ? [cell[0], cell[1](state)]
        : cell(state)
    )
  ))
