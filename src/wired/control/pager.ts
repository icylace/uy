import type { ClassProp, State, Transform, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"
import type { Wiring } from "../../component"

import { div, li, span, ul } from "ntml"
import { range } from "../../utility/range"
import { icon } from "../../wireless/indicator/icon"

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
  content: Content<S>,
  active: boolean,
): VDOM<S> => {
  return span({
    class: ["uy-pager-nav", !active && "uy-pager-nav-inactive"],
    ...active ? { onclick: handler } : {},
  }, content)
}

const pagerMore = <S>(content: Content<S>): VDOM<S> => {
  return span({ class: "uy-pager-more" }, content)
}

const pager = <S>(options: PagerOptions) => (wiring: Wiring<PagerData, S>) => (state: State<S>): VDOM<S> => {
  const { disabled, itemsPerPage, pageRange, ...etc } = options
  const data = wiring.get(state)
  const update = (state: State<S>, value: number) => {
    return wiring.set(state, { ...data, value })
  }

  const pageCount = Math.ceil(data.itemsTotal / itemsPerPage)
  const lastPage = pageCount - 1

  const rangeStartPage = Math.max(0, data.value - pageRange)
  const rangeFinishPage = Math.min(lastPage, data.value + pageRange)

  const pages = range(0, rangeFinishPage - rangeStartPage + 1).map(
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
