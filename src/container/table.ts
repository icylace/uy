import type { PropList, VDOM, VNode } from "hyperapp"
import type { ComponentOptions, Content } from "../types"

import * as html from "ntml"
import { component } from "../component"
import { icon } from "../display/icon"
import { box } from "./box"

export type TableOptions = ComponentOptions & {
  headers?: Content[]
  orderColumn: string | null
  sortDescending: boolean
}

export type TableCell = Content | [PropList, Content]

export type TableData = {
  rows: TableCell[]
}

const freshTable = (rows: VNode[]): TableData => ({ rows })

const tableHeader = (orderColumn: string | null) => (sortDescending: boolean) => (header: any | any[]): VDOM => {
  const props = Array.isArray (header) ? header[0] : {}
  const headerContent: Content = Array.isArray (header) ? header[1] : header
  const column = props["data-column"]
  const sorting = orderColumn != null && orderColumn === column
  const sortIndicator: VNode =
    sorting
      ? icon ({
        glyphicon: true,
        "glyphicon-chevron-down": sortDescending,
        "glyphicon-chevron-up": !sortDescending,
        "sort-indicator": true,
      })
      : null
  return html.th ({
    ...props,
    class: {
      "sort-column": sorting,
      [props.class]: !!props.class,
    },
  }, [headerContent, sortIndicator])
}

const tableRow = (row: VNode[]): VDOM =>
  !row || !Array.isArray (row)
    ? row
    : html.tr (row.map (
      (x: Content) =>
        Array.isArray (x)
          ? html.td (x[0], x[1])
          : html.td (x),
    ))

const rawTable = (
  {
    disabled,
    locked,
    headers,
    orderColumn,
    sortDescending,
    ...etc
  }: TableOptions,
) =>
  (data: TableData): VDOM =>
    box ({
      disabled,
      locked,
      "uy-control": true,
      "uy-table": true,
    }) ([
      html.table (etc, [
        headers && headers.length
          ? html.thead (headers.map (tableHeader (orderColumn) (sortDescending)))
          : null,
        html.tbody (data.rows.map (tableRow)),
      ]),
    ])

// table :: TableOptions -> [String] -> State -> VDOM
const table = component (rawTable)

export { freshTable, rawTable, table }
