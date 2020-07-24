import type { VDOM } from "hyperapp"
import type { TableData, TableOptions } from "../types"

import { h, text } from "hyperapp"

import { content } from "../utility/hyperappHelper"
import { component } from "../component"
import { icon } from "../display/icon"
import { box } from "./ui"

const freshTable = (rows: any[]): TableData => ({ rows })

const tableHeader = (orderColumn: string | null) => (sortDescending: boolean) => (header: any[] | any): VDOM => {
  const props = Array.isArray (header) ? header[0] : {}
  const headerContent = Array.isArray (header) ? header[1] : header
  const column = props["data-column"]
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
  return h (
    "th",
    {
      ...props,
      class: {
        "sort-column": sorting,
        [props.class]: !!props.class,
      },
    },
    [
      typeof headerContent === "string" ? text (headerContent) : headerContent,
      sortIndicator,
    ]
  )
}

const tableRow = (row: any[]): VDOM => {
  if (!row || !Array.isArray (row)) return row
  return h ("tr", {}, row.map (
    (x: any) => Array.isArray (x)
      ? h ("td", x[0], content (x[1]))
      : h ("td", {}, content (x)),
  ))
}

const rawTable = (
  {
    disabled,
    locked,
    headers,
    orderColumn,
    sortDescending,
    ...etc
  }: TableOptions
) => (data: TableData): VDOM => {
  return box ({
    disabled,
    locked,
    "uy-control": true,
    "uy-table": true,
  }) ([
    h ("table", etc, [
      headers && headers.length
        ? h ("thead", {}, headers.map (tableHeader (orderColumn) (sortDescending)))
        : null,
      h ("tbody", {}, data.rows.map (tableRow)),
    ]),
  ])
}

// table :: TableOptions -> [String] -> State -> VDOM
const table = component (rawTable)

export { freshTable, rawTable, table }
