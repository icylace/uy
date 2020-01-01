import { h } from "../hyperappHelper.js"
import { box, icon } from "../utility.js"

// table :: TableOptions -> [a] -> VNode
const table = ({ disabled, headers, orderColumn = null, sortAscending = true, ...etc }, rows) =>
  box("uy-control uy-table", [
    h("table", etc, [
      headers
        ? h(
            "thead",
            {},
            headers.map(header => {
              const props = Array.isArray(header) ? header[0] : {}
              const content = Array.isArray(header) ? header[1] : header
              const column = props["data-column"]
              const sorting = orderColumn != null && orderColumn === column
              const sortIndicator = sorting
                ? icon(`glyphicon glyphicon-chevron-${sortAscending ? "up" : "down"} sort-indicator`)
                : null
              const classes = sorting ? `${props.class} sort-column` : props.class
              return h("th", { ...props, class: classes }, [content, sortIndicator])
            }),
          )
        : null,
      h(
        "tbody",
        {},
        rows.map(row =>
          row
            ? h(
                "tr",
                {},
                row.map(x => (Array.isArray(x) ? h("td", x[0], [x[1]]) : h("td", {}, [x]))),
              )
            : null,
        ),
      ),
    ]),
  ])

export { table }
