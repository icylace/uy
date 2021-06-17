import type { Focus } from "eyepiece"
import type { Action, ClassProp, MaybeVNode, VNode } from "hyperapp"
import type { Content } from "../../utility/hyperappHelper/content"

import { get, set } from "eyepiece"
import { h, text } from "hyperapp"
import { range } from "../../utility/range"
import { c } from "../../utility/hyperappHelper/content"
import { icon } from "../indicator/icon"

export type PagerValue = number

export type PagerData = {
  itemsTotal: number
  value: PagerValue
}

export type PagerOptions<S> = {
  itemsPerPage: number
  pageRange: number
  onclick?: Action<S, PagerValue>
  class?: ClassProp
  disabled?: boolean
}

const freshPager = (itemsTotal: number, value: PagerValue): PagerData =>
  ({ value, itemsTotal })

const pagerNav = <S>(onclick: Action<S>, content: Content<S>, active: boolean): VNode<S> =>
  h("span", {
    class: ["uy-pager-nav", !active && "uy-pager-nav-inactive"],
    ...(active ? { onclick } : {}),
  }, c(content))

const pagerMore = <S>(content: Content<S>): VNode<S> =>
  h("span", { class: "uy-pager-more" }, c(content))

const pager = <S>(options: PagerOptions<S>) => (...focus: Focus) => {
  return (state: S): VNode<S> => {
    const { itemsPerPage, pageRange, onclick, disabled, ...etc } = options
    const x = get<PagerData>(focus)(state)
    const update = (value: any) => (state: S) => {
      const nextState = set<S>(focus, "value")(value)(state)
      return onclick ? onclick(nextState, value) : nextState
    }

    const pageCount = Math.ceil(x.itemsTotal / itemsPerPage)
    const lastPage = pageCount - 1

    const rangeStartPage = Math.max(0, x.value - pageRange)
    const rangeFinishPage = Math.min(lastPage, x.value + pageRange)

    const pages = range(0, rangeFinishPage - rangeStartPage + 1)
      .map((n: number): MaybeVNode<S> => {
        const currentPage = rangeStartPage + n
        const current = currentPage === x.value
        return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
          ? h("li", {
            class: ["uy-pager-nav uy-pager-page", current && "uy-pager-current"],
            onclick: update(currentPage),
          }, h("span", {}, text(currentPage + 1)))
          : null
      })

    const morePrev = pagerMore<S>(text(rangeStartPage > 0 ? "..." : ""))
    const moreNext = pagerMore<S>(text(rangeFinishPage < lastPage ? "..." : ""))

    const navFirst = pagerNav(
      update(0),
      [icon("fas fa-angle-double-left"), text("first")],
      x.value !== 0,
    )

    const navPrev = pagerNav(
      update(Math.max(0, x.value - 1)),
      [icon("fas fa-angle-left"), text("prev")],
      x.value !== 0,
    )

    const navNext = pagerNav(
      update(Math.min(lastPage, x.value + 1)),
      [text("next"), icon("fas fa-angle-right")],
      x.value !== lastPage,
    )

    const navLast = pagerNav(
      update(lastPage),
      [text("last"), icon("fas fa-angle-double-right")],
      x.value !== lastPage,
    )

    return h("div", {
      ...etc,
      class: ["uy-control uy-pager", { disabled }, etc.class],
    }, [
      h("ul", {}, [
        h("li", {}, navFirst),
        h("li", {}, navPrev),
        h("li", {}, morePrev),
        ...pages,
        h("li", {}, moreNext),
        h("li", {}, navNext),
        h("li", {}, navLast),
      ]),
    ])
  }
}

export { freshPager, pager }
