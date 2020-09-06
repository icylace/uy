import type { ClassProp, PropList, VDOM } from "hyperapp"
import type { Content, Contents } from "ntml"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { icon } from "../display/icon"
import { box } from "./box"

export type TableCell<S> = Contents<S> | [PropList<S>, Contents<S>]
export type TableRow<S> = TableCell<S>[]

export type TableOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  headers?: TableRow<S>
  locked: boolean
  orderColumn?: string | null
  sortDescending?: boolean
}

export type TableData<S> = {
  rows: TableRow<S>[]
}

const freshTable = <S>(rows: TableRow<S>[]): TableData<S> =>
  ({ rows })

const tableHeader =
  (orderColumn?: string | null) =>
    (sortDescending: boolean) =>
      <S>(header: TableCell<S>): VDOM<S> => {
        const props = (Array.isArray (header) ? header[0] : {}) as PropList<S>
        const headerContents: Content<S>[] = (Array.isArray (header) ? header[1] : [header]) as Content<S>[]
        const column = props && "data-column" in props && props["data-column"]
        const sorting = orderColumn != null && orderColumn === column
        return html.th (
          {
            ...props,
            class: cc ([{ "sort-column": sorting }, props.class]),
          },
          [
            ...headerContents,
            sorting
              ? icon ({
                glyphicon: true,
                "glyphicon-chevron-down": sortDescending,
                "glyphicon-chevron-up": !sortDescending,
                "sort-indicator": true,
              })
              : null,
          ],
        ) as VDOM<S>
      }

const tableCell = <S>(x: TableCell<S>): VDOM<S> =>
  (Array.isArray (x)
    ? html.td (x[0], x[1])
    : html.td (x)) as VDOM<S>

const tableRow = <S>(row: TableRow<S>): VDOM<S> =>
  html.tr (row.map (tableCell)) as VDOM<S>

const rawTable = <S>(
  {
    disabled,
    locked,
    headers,
    orderColumn,
    sortDescending,
    ...etc
  }: TableOptions<S>,
) =>
    (data: TableData<S>): VDOM<S> =>
      box ({
        "uy-control": true,
        "uy-table": true,
        locked,
        disabled,
      }) ([
        html.table (etc, [
          Array.isArray (headers) && headers.length
            ? html.thead (headers.map (tableHeader (orderColumn) (!!sortDescending)))
            : null,
          html.tbody (data.rows.map (tableRow)),
        ]),
      ])

const table = component (rawTable)

export { freshTable, rawTable, table }
