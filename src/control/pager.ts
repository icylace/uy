import type { State, VDOM, VNode } from "hyperapp"
import type { Contents } from "ntml"
import type { Control, ControlData, ControlOptions } from "../types"

import cc from "classcat"
import { div, li, span, ul } from "ntml"
import { range } from "../utility/utility"
import { component } from "../component"
import { icon } from "../display/icon"

export type PagerOptions = ControlOptions & {
  itemsPerPage: number
  pageRange: number
}

export type PagerData = ControlData<number> & { itemsTotal: number }

// freshPager :: Int -> Int -> PagerData
export const freshPager = (itemsTotal: number) => (value: number): PagerData =>
  ({ value, itemsTotal })

const pagerNav = (
  handler: Function,
  content: Contents,
  active: boolean,
): VDOM =>
  span ({
    class: ["uy-pager-nav", !active && "uy-pager-nav-inactive"],
    ...active
      ? { onclick: <S>(_state: State<S>, _event: any): any => handler }
      : {},
  }, content)

const pagerMore = (content: Contents): VDOM =>
  span ({ class: "uy-pager-more" }, content)

const rawPager =
  ({ disabled, locked, itemsPerPage, pageRange, update, ...etc }: PagerOptions) =>
    (data: PagerData): VDOM | null => {
      if (!data.itemsTotal) return null

      const pageCount = Math.ceil (data.itemsTotal / itemsPerPage)
      const lastPage = pageCount - 1

      const rangeStartPage = Math.max (0, data.value - pageRange)
      const rangeFinishPage = Math.min (lastPage, data.value + pageRange)

      const pages = range (0) (rangeFinishPage - rangeStartPage + 1).map (
        (n: number): VNode => {
          const currentPage = rangeStartPage + n
          const current = currentPage === data.value
          return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
            ? li ({
              class: {
                "uy-pager-nav": true,
                "uy-pager-page": true,
                "uy-pager-current": current,
              },
              onclick: <S>(state: State<S>): State<S> =>
                update (state, currentPage),
            }, span (currentPage + 1))
            : null
        },
      )

      const morePrev = pagerMore (rangeStartPage > 0 ? "..." : "")
      const moreNext = pagerMore (rangeFinishPage < lastPage ? "..." : "")

      const navFirst = pagerNav (
        <S>(state: State<S>): State<S> => update (state, 0),
        [icon ("fas fa-angle-double-left"), " first"],
        data.value !== 0,
      )

      const navPrev = pagerNav (
        <S>(state: State<S>): State<S> => update (state, Math.max (0, data.value - 1)),
        [icon ("fas fa-angle-left"), " prev"],
        data.value !== 0,
      )

      const navNext = pagerNav (
        <S>(state: State<S>): State<S> => update (state, Math.min (lastPage, data.value + 1)),
        ["next ", icon ("fas fa-angle-right")],
        data.value !== lastPage,
      )

      const navLast = pagerNav (
        <S>(state: State<S>): State<S> => update (state, lastPage),
        ["last ", icon ("fas fa-angle-double-right")],
        data.value !== lastPage,
      )

      return div ({
        ...etc,
        class: cc (["uy-control uy-pager", { locked, disabled }, etc.class]),
      }, [
        ul ([
          li (navFirst),
          li (navPrev),
          li (morePrev),
          ...pages,
          li (moreNext),
          li (navNext),
          li (navLast),
        ]),
      ])
    }

export const pager: Control = component (rawPager)
