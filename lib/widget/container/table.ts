import type { View } from "../../utility/hyperappHelper/content"
import { ClassProp, Props, MaybeVNode, VNode, h } from "hyperapp"
import { icon } from "../indicator/icon"

export type { TableCell, TableOptions, TableRow }
export { table }

// -----------------------------------------------------------------------------

type TableCell<S> =
  | MaybeVNode<S>
  | readonly MaybeVNode<S>[]
  | View<S>
  | [Props<S>, MaybeVNode<S> | readonly MaybeVNode<S>[] | View<S>]

type TableRow<S> = TableCell<S>[]

type TableOptions<S> =
  | TableRow<S>
  | {
    [_: string]: unknown
    class?: ClassProp
    disabled?: boolean
    headers?: TableRow<S>
    orderColumn?: string | null
    sortDescending?: boolean
  }

const tableHeader = <S>(orderColumn: string | null | undefined, sortDescending: boolean | null | undefined) => {
  return (header: TableCell<S>): VNode<S> => {
    const props = (Array.isArray(header) ? header[0] : {}) as Props<S>
    const headerContents: MaybeVNode<S>[] = (Array.isArray(header) ? header[1] : [header]) as MaybeVNode<S>[]
    const column = props && "data-column" in props && props["data-column"]
    const sorting = orderColumn != null && orderColumn === column
    return h("th", {
      ...props,
      class: [props.class, { "sort-column": sorting }]
    }, [
      ...headerContents,
      sorting
        ? icon({
          glyphicon: true,
          "glyphicon-chevron-down": !!sortDescending,
          "glyphicon-chevron-up": !sortDescending,
          "sort-indicator": true,
        })
        : null,
    ])
  }
}

const hasPropList = <S>(
  x: TableCell<S>
): x is [Props<S>, MaybeVNode<S> | readonly MaybeVNode<S>[] | View<S>] =>
  Array.isArray(x)

const tableCell = <S>(x: TableCell<S>) => (state: S): VNode<S> =>
  hasPropList(x)
    ? h("td", x[0], typeof x[1] === "function" ? x[1](state) : x[1])
    : h("td", {}, typeof x === "function" ? x(state) : x)

const tableRow = <S>(row: TableRow<S>) => (state: S): VNode<S> =>
  h("tr", {}, row.map((cell) => tableCell(cell)(state)))

const table = <S>(options: TableOptions<S> = {}, rows: TableRow<S>[]) => {
  return (state: S): VNode<S> => {
    const props = Array.isArray(options) ? { headers: options } : options
    const { headers, orderColumn, sortDescending, disabled, ...etc } = props
    return h("div", { ...etc, class: ["uy-control uy-table", etc.class, { disabled }] }, [
      h("table", {}, [
        Array.isArray(headers) && headers.length
          ? h("thead", {}, headers.map(tableHeader(orderColumn, sortDescending)))
          : null,
        h("tbody", {}, rows.map((row) => tableRow(row)(state))),
      ]),
    ])
  }
}
