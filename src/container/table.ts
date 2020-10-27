import type { ClassProp, PropList, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import cc from "classcat"
import * as html from "ntml"
import { icon } from "../indicator/icon"
import { box } from "./box"

export type TableCell<S>
  = Content<S>
  | Content<S>[]
  | [PropList<S>, Content<S> | Content<S>[]]

export type TableRow<S> = TableCell<S>[]

export type TableData<S> = {
  rows: TableRow<S>[]
}

export type TableOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled?: boolean
  headers?: TableRow<S>
  locked?: boolean
  orderColumn?: string | null
  sortDescending?: boolean
  wiring: Wiring<S, TableData<S>>
}

const freshTable = <S>(rows: TableRow<S>[]): TableData<S> => {
  return { rows }
}

const tableHeader = (orderColumn: string | null | undefined, sortDescending: boolean) => {
  return <S>(header: TableCell<S>): VDOM<S> => {
    const props = (Array.isArray(header) ? header[0] : {}) as PropList<S>
    const headerContents: Content<S>[] = (Array.isArray(header) ? header[1] : [header]) as Content<S>[]
    const column = props && "data-column" in props && props["data-column"]
    const sorting = orderColumn != null && orderColumn === column
    return html.th(
      {
        ...props,
        class: cc([{ "sort-column": sorting }, props.class]),
      },
      [
        ...headerContents,
        sorting
          ? icon({
            glyphicon: true,
            "glyphicon-chevron-down": sortDescending,
            "glyphicon-chevron-up": !sortDescending,
            "sort-indicator": true,
          })
          : null,
      ],
    )
  }
}

const hasPropList = <S>(x: TableCell<S>): x is [PropList<S>, Content<S> | Content<S>[]] => {
  return Array.isArray(x)
}

const tableCell = <S>(x: TableCell<S>): VDOM<S> => {
  return hasPropList(x)
    ? html.td(x[0], x[1])
    : html.td(x)
}

const tableRow = <S>(row: TableRow<S>): VDOM<S> => {
  return html.tr(row.map(tableCell))
}

const table = <S>(options: TableOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, headers, orderColumn, sortDescending, wiring, ...etc } = options
  const x = wiring.data(state)
  return box({
    "uy-control": true,
    "uy-table": true,
    locked,
    disabled,
  }, [
    html.table(etc, [
      Array.isArray(headers) && headers.length
        ? html.thead(headers.map(tableHeader(orderColumn, !!sortDescending)))
        : null,
      html.tbody(x.rows.map(tableRow)),
    ]),
  ])
}

export { freshTable, table }
