import { h } from "hyperapp"
import { component } from "../component"
import { icon } from "../display/icon"
import { box } from "./ui"

// freshTable :: [Any] -> Object
const freshTable = (rows: any[]): any => ({ rows })

// tableHeader :: Nullable String -> Bool -> Any -> VNode
const tableHeader = (orderColumn: string | null) => (sortDescending: boolean) => (header: any): any => {
  const props = Array.isArray (header) ? header[0] : {}
  const content = Array.isArray (header) ? header[1] : header
  const column = props["data-column"]
  const sorting = orderColumn != null && orderColumn === column
  const sortIndicator =
    sorting
      ? icon ({
        glyphicon: true,
        "glyphicon-chevron-down": !!sortDescending,
        "glyphicon-chevron-up": !sortDescending,
        "sort-indicator": true,
      })
      : null
  return h ("th", {
    ...props,
    class: {
      "sort-column": sorting,
      [props.class]: !!props.class,
    },
  }, [content, sortIndicator])
}

// tableRow :: [Any] -> VNode
const tableRow = (row: any[]): any => {
  if (!row) return row
  if (!Array.isArray (row)) return [row]
  return h (
    "tr",
    {},
    row.map (
      (x: any) => Array.isArray (x)
        ? h ("td", x[0], [x[1]])
        : h ("td", {}, [x])
    )
  )
}

// table :: TableOptions -> [[VNode] | VNode] -> VNode
// table :: TableOptions -> [TableCell] -> VNode

// rawTable :: TableOptions -> Object -> VNode
const rawTable = ({ disabled, locked, headers, orderColumn, sortDescending, ...etc }: any) => (data: any): any => {
  return box ({
    disabled,
    locked,
    "uy-control": true,
    "uy-table": true,
  }) ([
    h ("table", etc, [
      headers && headers.length
        ? h ("thead", {}, headers.map (tableHeader (orderColumn) (!!sortDescending)))
        : null,
      h ("tbody", {}, data.rows.map (tableRow)),
    ]),
  ])
}

// table :: TableOptions -> [String] -> State -> VNode
const table = component (rawTable)

export { freshTable, rawTable, table }
