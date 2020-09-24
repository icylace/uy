import type { ClassProp, Transform, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"

import cc from "classcat"
import { div, li, span, ul } from "ntml"
import { range } from "../utility/utility"
import { component } from "../component"
import { icon } from "../display/icon"

export type PagerOptions<S> = {
  class?: ClassProp
  disabled: boolean
  itemsPerPage: number
  locked: boolean
  pageRange: number
  update: Transform<S>
}

export type PagerData = {
  itemsTotal: number
  value: number
}

export const freshPager = (itemsTotal: number) => (value: number): PagerData =>
  ({ value, itemsTotal })

const pagerNav = <S>(
  handler: Transform<S>,
  content: Content<S> | Content<S>[],
  active: boolean,
): VDOM<S> =>
  span({
    class: ["uy-pager-nav", !active && "uy-pager-nav-inactive"],
    ...active
      ? { onclick: handler }
      : {},
  }, content)

const pagerMore = <S>(content: Content<S> | Content<S>[]): VDOM<S> =>
  span({ class: "uy-pager-more" }, content)

const rawPager =
  <S>({ disabled, locked, itemsPerPage, pageRange, update, ...etc }: PagerOptions<S>) =>
    (data: PagerData): VDOM<S> | null => {
      if (!data.itemsTotal) return null

      const pageCount = Math.ceil(data.itemsTotal / itemsPerPage)
      const lastPage = pageCount - 1

      const rangeStartPage = Math.max(0, data.value - pageRange)
      const rangeFinishPage = Math.min(lastPage, data.value + pageRange)

      const pages = range(0)(rangeFinishPage - rangeStartPage + 1).map(
        (n: number): VNode<S> => {
          const currentPage = rangeStartPage + n
          const current = currentPage === data.value
          return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
            ? li({
              class: ["uy-pager-nav", "uy-pager-page", current && "uy-pager-current"],
              onclick: (state) => update(state, currentPage),
            }, span(currentPage + 1))
            : null
        },
      )

      const morePrev = pagerMore<S>(rangeStartPage > 0 ? "..." : "")
      const moreNext = pagerMore<S>(rangeFinishPage < lastPage ? "..." : "")

      const navFirst = pagerNav<S>(
        (state) => update(state, 0),
        [icon("fas fa-angle-double-left"), " first"],
        data.value !== 0,
      )

      const navPrev = pagerNav<S>(
        (state) => update(state, Math.max(0, data.value - 1)),
        [icon("fas fa-angle-left"), " prev"],
        data.value !== 0,
      )

      const navNext = pagerNav<S>(
        (state) => update(state, Math.min(lastPage, data.value + 1)),
        ["next ", icon("fas fa-angle-right")],
        data.value !== lastPage,
      )

      const navLast = pagerNav<S>(
        (state) => update(state, lastPage),
        ["last ", icon("fas fa-angle-double-right")],
        data.value !== lastPage,
      )

      return div({
        ...etc,
        class: cc(["uy-control uy-pager", { locked, disabled }, etc.class]),
      }, [
        ul([
          li(navFirst),
          li(navPrev),
          li(morePrev),
          ...pages,
          li(moreNext),
          li(navNext),
          li(navLast),
        ]),
      ])
    }

export const pager = component(rawPager)
