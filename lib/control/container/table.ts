import type { ClassProp, Props, MaybeVNode, VNode } from "hyperapp"
import type { Content } from "../../types"

import { h } from "hyperapp"
import { icon } from "../indicator/icon"
import { box } from "./box"

export type TableCell<S> = MaybeVNode<S> | [Props<S>, Content<S>]
export type TableRow<S> = TableCell<S>[]
export type TableOptions<S> =
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
      class: [{ "sort-column": sorting }, props.class]
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

const hasPropList = <S>(x: TableCell<S>): x is [Props<S>, Content<S>] =>
  Array.isArray(x)

const tableCell = <S>(x: TableCell<S>): VNode<S> =>
  hasPropList(x) ? h("td", x[0], x[1]) : h("td", {}, x)

const tableRow = <S>(row: TableRow<S>): VNode<S> =>
  h("tr", {}, row.map(tableCell))

const table = <S>(options: TableOptions<S> = {}, rows: TableRow<S>[]): VNode<S> => {
  const props = Array.isArray(options) ? { headers: options } : options
  const { headers, orderColumn, sortDescending, disabled, ...etc } = props
  return box(["uy-control uy-table", { disabled }], [
    h("table", etc, [
      Array.isArray(headers) && headers.length
        ? h("thead", {}, headers.map(tableHeader(orderColumn, sortDescending)))
        : null,
      h("tbody", {}, rows.map(tableRow)),
    ]),
  ])
}

export { table }
