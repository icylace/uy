import type { ClassProp, Payload, State, VDOM } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"
import type { Path } from "../utility/shadesHelper"
import type { TableData, TableRow } from "../container/table"
import type { CheckboxData } from "./checkbox"

import cc from "classcat"
import { div } from "ntml"
import { table } from "../container/table"
import { checkbox, freshCheckbox } from "./checkbox"

export type ChecklistItem = {
  id: string
  selected: boolean
}

export type Checklist = {
  items: ChecklistItem[]
}

export type ChecklistOptions<S> = {
  class?: ClassProp
  disabled?: boolean
  locked?: boolean
  path: Path
  render: (_: Content<S> | Content<S>[]) => VDOM<S>
  wiring: Wiring<S, Checklist>
}

const freshChecklist = (items: ChecklistItem[]): Checklist => {
  return { items }
}

const updateItem = (path: Path, i: number) => <S, P>(state: State<S>, value: Payload<P>): State<S> => {
  return set([...path, "items", i])(value)(state)
}







// export type Wiring<R extends Record<string, any>, D> = Readonly<{
//   data: (r: R) => D
//   update: (r: R, x: D) => R
// }>

// const wire = <R extends Record<string, any>, D>
//   (prop: string, context?: Wiring<R, D>): Wiring<R, D> => ({
//     data: (r) => context
//       ? (context.data(r) as Record<string, any>)[prop]
//       : r[prop],
//     update: (r, x) => context
//       ? context.update(r, { ...context.data(r), [prop]: x })
//       : { ...r, [prop]: x },
//   })









const checklist = <S>(options: ChecklistOptions<S>) => (state: State<S>): VDOM<S> => {
  const { disabled, locked, render, wiring, ...etc } = options
  const x = wiring.data(state)

  const item = (x: ChecklistItem, i: number): TableRow<S> => {
    const itemWiring: Wiring<S, CheckboxData> = ({
      data: (r) => freshCheckbox(wiring.data(r)[i].selected),
      update: (r, selected) => wiring.update(r, {
        ...wiring.data(r),
        [i]: {
          ...wiring.data(r)[i],
          selected,
        },
      }),
    })

    return [
      [
        { class: { "uy-horizontal": x.id === "other" } },
        [
          checkbox(
            {
              disabled,
              locked,
              label: render(x.id),
              // update: updateItem(path, i),
              // wiring: wire(i, x),
              wiring: itemWiring,
            },
          )(state),
        ],
      ],
    ]
  }

  const tableData: TableData<S> = {
    rows: x.items.map(item),
  }

  // const tableWiring = wiring

  return div(
    {
      ...etc,
      class: cc(["uy-container uy-checklist", { locked, disabled }, etc.class]),
    },
    [table({ disabled, locked, wiring:  }, tableData)],
  )
}

export { checklist, freshChecklist }
