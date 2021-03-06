import type { ClassProp, PropList, VDOM } from "hyperapp"
import type { Content, Stuff } from "ntml"

import * as html from "ntml"
import { icon } from "../indicator/icon"
import { box } from "./box"

export type TableCell<S> = Stuff<S> | [PropList<S>, Content<S>]
export type TableRow<S> = TableCell<S>[]
export type TableOptions<S>
  = TableRow<S>
  | {
    [_: string]: unknown
    class?: ClassProp
    disabled?: boolean
    headers?: TableRow<S>
    orderColumn?: string | null
    sortDescending?: boolean
  }

const tableHeader = <S>(orderColumn: string | null | undefined, sortDescending: boolean | null | undefined) => {
  return (header: TableCell<S>): VDOM<S> => {
    const props = (Array.isArray(header) ? header[0] : {}) as PropList<S>
    const headerContents: Stuff<S>[] = (Array.isArray(header) ? header[1] : [header]) as Stuff<S>[]
    const column = props && "data-column" in props && props["data-column"]
    const sorting = orderColumn != null && orderColumn === column
    return html.th(
      { ...props, class: [{ "sort-column": sorting }, props.class], },
      [
        ...headerContents,
        sorting
          ? icon({
            glyphicon: true,
            "glyphicon-chevron-down": !!sortDescending,
            "glyphicon-chevron-up": !sortDescending,
            "sort-indicator": true,
          })
          : null,
      ],
    )
  }
}

const hasPropList = <S>(x: TableCell<S>): x is [PropList<S>, Content<S>] =>
  Array.isArray(x)

const tableCell = <S>(x: TableCell<S>): VDOM<S> =>
  hasPropList(x) ? html.td(x[0], x[1]) : html.td(x)

const tableRow = <S>(row: TableRow<S>): VDOM<S> =>
  html.tr(row.map(tableCell))

const table = <S>(options: TableOptions<S> = {}, rows: TableRow<S>[]): VDOM<S> => {
  const props = Array.isArray(options) ? { headers: options } : options
  const { headers, orderColumn, sortDescending, disabled, ...etc } = props
  return box(["uy-control uy-table", { disabled }], [
    html.table(etc, [
      Array.isArray(headers) && headers.length
        ? html.thead(headers.map(tableHeader(orderColumn, sortDescending)))
        : null,
      html.tbody(rows.map(tableRow)),
    ]),
  ])
}

export { table }
