import type { State, VDOM, VNode } from "hyperapp"
import type { Control, ControlData, PagerOptions } from "../types"

import { text } from "hyperapp"

import { div, li, span, ul } from "ntml"
import { range } from "../utility/utility"
import { component } from "../component"
import { icon } from "../display/icon"

// freshPager :: Int -> Int -> PagerData
const freshPager = (itemsTotal: number) =>
  (value: number): ControlData<number> => ({ value, itemsTotal })

const pagerNav = (
  handler: Function,
  contents: VNode[],
  active: boolean,
): VDOM =>
  span ({
    class: {
      "uy-pager-nav": true,
      "uy-pager-nav-inactive": !active,
    },
    ...active
      ? { onclick: <S>(_state: State<S>, _event: any): any => handler }
      : {},
  }, contents)

const pagerMore = (contents: VNode[]): VDOM =>
  span ({ class: "uy-pager-more" }, contents)

const rawPager = (
  { disabled, locked, itemsPerPage, pageRange, update, ...etc }: PagerOptions,
) =>
  (data: ControlData<number>): VDOM | null => {
    if (!data.itemsTotal) return null

    const pageCount = Math.ceil (data.itemsTotal / itemsPerPage)
    const lastPage = pageCount - 1

    const rangeStartPage = Math.max (0, data.value - pageRange)
    const rangeFinishPage = Math.min (lastPage, data.value + pageRange)

    const pages = range (0) (rangeFinishPage - rangeStartPage + 1).map (
      (n: number): any => {
        const currentPage = rangeStartPage + n
        const current = currentPage === data.value
        return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
          ? li ({
            class: {
              "uy-pager-nav": true,
              "uy-pager-page": true,
              "uy-pager-current": current,
            },
            onclick: <S>(state: State<S>, _event: any) =>
              update (state, currentPage),
          }, span (currentPage + 1))
          : null
      },
    )

    const morePrev = pagerMore ([text (rangeStartPage > 0 ? "..." : "")])
    const moreNext = pagerMore ([text (rangeFinishPage < lastPage ? "..." : "")])

    const navFirst = pagerNav (
      <S>(state: State<S>) => update (state, 0),
      [icon ({ fas: true, "fa-angle-double-left": true }), text (" first")],
      data.value !== 0,
    )

    const navPrev = pagerNav (
      <S>(state: State<S>) => update (state, Math.max (0, data.value - 1)),
      [icon ({ fas: true, "fa-angle-left": true }), text (" prev")],
      data.value !== 0,
    )

    const navNext = pagerNav (
      <S>(state: State<S>) => update (state, Math.min (lastPage, data.value + 1)),
      [text ("next "), icon ({ fas: true, "fa-angle-right": true })],
      data.value !== lastPage,
    )

    const navLast = pagerNav (
      <S>(state: State<S>) => update (state, lastPage),
      [text ("last "), icon ({ fas: true, "fa-angle-double-right": true })],
      data.value !== lastPage,
    )

    return div ({
      ...etc,
      class: {
        disabled,
        locked,
        "uy-control": true,
        "uy-pager": true,
        [etc.class]: !!etc.class,
      },
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

const pager: Control = component (rawPager)

export { freshPager, pager }
