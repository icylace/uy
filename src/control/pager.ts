import type { ClassProp, State, Transform, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../component"

import { div, li, span, ul } from "ntml"
import { range } from "../utility/utility"
import { icon } from "../indicator/icon"

export type PagerData = {
  itemsTotal: number
  value: number
}

export type PagerOptions = {
  class?: ClassProp
  disabled?: boolean
  itemsPerPage: number
  pageRange: number
}

const freshPager = (itemsTotal: number, value: number): PagerData => {
  return { value, itemsTotal }
}

const pagerNav = <S>(
  handler: Transform<S>,
  content: Content<S> | Content<S>[],
  active: boolean,
): VDOM<S> => {
  return span({
    class: ["uy-pager-nav", !active && "uy-pager-nav-inactive"],
    ...active ? { onclick: handler } : {},
  }, content)
}

const pagerMore = <S>(content: Content<S> | Content<S>[]): VDOM<S> => {
  return span({ class: "uy-pager-more" }, content)
}

const pager = <S>(options: PagerOptions) => (wiring: Wiring<S, PagerData>) => (state: State<S>): VDOM<S> | null => {
  const { disabled, itemsPerPage, pageRange, ...etc } = options
  const r = wiring.get(state)
  const update = (state: State<S>, value: number) => {
    return wiring.set(state, { ...r, value })
  }

  if (!r.itemsTotal) return null

  const pageCount = Math.ceil(r.itemsTotal / itemsPerPage)
  const lastPage = pageCount - 1

  const rangeStartPage = Math.max(0, r.value - pageRange)
  const rangeFinishPage = Math.min(lastPage, r.value + pageRange)

  const pages = range(0, rangeFinishPage - rangeStartPage + 1).map(
    (n: number): VNode<S> => {
      const currentPage = rangeStartPage + n
      const current = currentPage === r.value
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
    r.value !== 0,
  )

  const navPrev = pagerNav<S>(
    (state) => update(state, Math.max(0, r.value - 1)),
    [icon("fas fa-angle-left"), " prev"],
    r.value !== 0,
  )

  const navNext = pagerNav<S>(
    (state) => update(state, Math.min(lastPage, r.value + 1)),
    ["next ", icon("fas fa-angle-right")],
    r.value !== lastPage,
  )

  const navLast = pagerNav<S>(
    (state) => update(state, lastPage),
    ["last ", icon("fas fa-angle-double-right")],
    r.value !== lastPage,
  )

  return div({
    ...etc,
    class: ["uy-control uy-pager", { disabled }, etc.class],
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

export { freshPager, pager }
