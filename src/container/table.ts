import type { ClassProp, PropList, VDOM } from "hyperapp"
import type { Contents } from "ntml"

import cc from "classcat"
import * as html from "ntml"
import { component } from "../component"
import { icon } from "../display/icon"
import { box } from "./box"

export type TableCell<S> = Contents<S> | [PropList<S>, Contents<S>]

export type TableOptions<S> = {
  [_: string]: unknown
  class?: ClassProp
  disabled: boolean
  headers?: TableCell<S>[]
  locked: boolean
  orderColumn?: string | null
  sortDescending?: boolean
}

export type TableData<S> = {
  rows: TableCell<S>[][]
}

const freshTable = <S>(rows: TableCell<S>[][]): TableData<S> => ({ rows })

const tableHeader =
  (orderColumn?: string | null) =>
    (sortDescending: boolean) =>
      <S>(header: Contents<S> | [PropList<S>, Contents<S>]): VDOM<S> => {
        const props = Array.isArray (header) ? header[0] : {}
        const headerContents = Array.isArray (header) ? header[1] : header
        const column = props && "data-column" in props && props["data-column"]
        const sorting = orderColumn != null && orderColumn === column
        const sortIndicator =
          sorting
            ? icon ({
              glyphicon: true,
              "glyphicon-chevron-down": sortDescending,
              "glyphicon-chevron-up": !sortDescending,
              "sort-indicator": true,
            })
            : null
        return html.th (
          {
            ...props,
            class: cc ([{ "sort-column": sorting }, props.class]),
          },
          Array.isArray (headerContents)
            ? [...headerContents, sortIndicator]
            : [headerContents, sortIndicator],
        )
      }

const tableRow = <S>(row: TableCell<S>[]): VDOM<S> =>
  !row || !Array.isArray (row)
    ? row
    : html.tr (row.map (
      (x: TableCell<S>): VDOM<S> =>
        Array.isArray (x)
          ? html.td (x[0], x[1])
          : html.td (x),
    ))

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

// table :: TableOptions -> [String] -> State -> VDOM
const table = component (rawTable)

export { freshTable, rawTable, table }
