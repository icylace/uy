import type { Focus } from "eyepiece"
import type { ActionTransform, ClassProp, State, Transform, VDOM, VNode } from "hyperapp"
import type { Content } from "ntml"

import { get, set } from "eyepiece"
import { div, li, span, ul } from "ntml"
import { range } from "../../utility/range"
import { icon } from "../indicator/icon"

export type PagerValue = number

export type PagerData = {
  itemsTotal: number
  value: PagerValue
}

export type PagerOptions<S> = {
  itemsPerPage: number
  pageRange: number
  onclick?: Transform<S, PagerValue>
  class?: ClassProp
  disabled?: boolean
}

const freshPager = (itemsTotal: number, value: number): PagerData =>
  ({ value, itemsTotal })

const pagerNav = <S>(onclick: ActionTransform<S>, content: Content<S>, active: boolean): VDOM<S> =>
  span({
    class: ["uy-pager-nav", !active && "uy-pager-nav-inactive"],
    ...(active ? { onclick } : {}),
  }, content)

const pagerMore = <S>(content: Content<S>): VDOM<S> =>
  span({ class: "uy-pager-more" }, content)

const pager = <S>(options: PagerOptions<S>) => (...focus: Focus) => {
  return (state: State<S>): VDOM<S> => {
    const { itemsPerPage, pageRange, onclick, disabled, ...etc } = options
    const x = get<PagerData>(focus)(state)
    const update = (value: any) => (state: State<S>) => {
      const nextState = set<State<S>>(focus, "value")(value)(state)
      return onclick ? onclick(nextState, value) : nextState
    }

    const pageCount = Math.ceil(x.itemsTotal / itemsPerPage)
    const lastPage = pageCount - 1

    const rangeStartPage = Math.max(0, x.value - pageRange)
    const rangeFinishPage = Math.min(lastPage, x.value + pageRange)

    const pages = range(0, rangeFinishPage - rangeStartPage + 1).map(
      (n: number): VNode<S> => {
        const currentPage = rangeStartPage + n
        const current = currentPage === x.value
        return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
          ? li({
            class: ["uy-pager-nav uy-pager-page", current && "uy-pager-current"],
            onclick: update(currentPage),
          }, span(currentPage + 1))
          : null
      },
    )

    const morePrev = pagerMore<S>(rangeStartPage > 0 ? "..." : "")
    const moreNext = pagerMore<S>(rangeFinishPage < lastPage ? "..." : "")

    const navFirst = pagerNav<S>(
      update(0),
      [icon("fas fa-angle-double-left"), "first"],
      x.value !== 0,
    )

    const navPrev = pagerNav<S>(
      update(Math.max(0, x.value - 1)),
      [icon("fas fa-angle-left"), "prev"],
      x.value !== 0,
    )

    const navNext = pagerNav<S>(
      update(Math.min(lastPage, x.value + 1)),
      ["next", icon("fas fa-angle-right")],
      x.value !== lastPage,
    )

    const navLast = pagerNav<S>(
      update(lastPage),
      ["last", icon("fas fa-angle-double-right")],
      x.value !== lastPage,
    )

    return div({ ...etc, class: ["uy-control uy-pager", { disabled }, etc.class] }, [
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
}

export { freshPager, pager }
