import type { State, VDOM, VNode } from "hyperapp"
import type { Control, ControlData, PagerOptions } from "../types"

import { h, text } from "hyperapp"
import { component } from "../component"
import { icon } from "../display/icon"
import { range } from "../utility/utility"

// freshPager :: Int -> Int -> PagerData
const freshPager = (itemsTotal: number) => (value: number): ControlData<number> => ({ value, itemsTotal })

const pagerNav = (handler: Function, contents: VNode[], active: boolean): VDOM =>
  h ("span", {
    class: {
      "uy-pager-nav": true,
      "uy-pager-nav-inactive": !active,
    },
    ...active ? { onclick: <S>(_state: State<S>, _event: any): any => handler } : {},
  }, contents)

const pagerMore = (contents: VNode[]): VDOM => h ("span", { class: "uy-pager-more" }, contents)

const rawPager = ({ disabled, locked, itemsPerPage, pageRange, update, ...etc }: PagerOptions) => (data: ControlData<number>): VDOM | null => {
  if (!data.itemsTotal) return null

  const pageCount = Math.ceil (data.itemsTotal / itemsPerPage)
  const lastPage = pageCount - 1

  const rangeStartPage = Math.max (0, data.value - pageRange)
  const rangeFinishPage = Math.min (lastPage, data.value + pageRange)

  const pages = range (0) (rangeFinishPage - rangeStartPage + 1).map ((n: number): any => {
    const currentPage = rangeStartPage + n
    const current = currentPage === data.value
    return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
      ? h ("li", {
        class: {
          "uy-pager-nav": true,
          "uy-pager-page": true,
          "uy-pager-current": current,
        },
        onclick: (state: any, _event: any) => update (state, currentPage),
      }, [h ("span", {}, [text (currentPage + 1)])])
      : null
  })

  const morePrev = pagerMore ([text (rangeStartPage > 0 ? "..." : "")])
  const moreNext = pagerMore ([text (rangeFinishPage < lastPage ? "..." : "")])

  const navFirst =
    pagerNav (
      (state: any) => update (state, 0),
      [icon ({ fas: true, "fa-angle-double-left": true }), text (" first")],
      data.value !== 0
    )

  const navPrev =
    pagerNav (
      (state: any) => update (state, Math.max (0, data.value - 1)),
      [icon ({ fas: true, "fa-angle-left": true }), text (" prev")],
      data.value !== 0
    )

  const navNext =
    pagerNav (
      (state: any) => update (state, Math.min (lastPage, data.value + 1)),
      [text ("next "), icon ({ fas: true, "fa-angle-right": true })],
      data.value !== lastPage
    )

  const navLast =
    pagerNav (
      (state: any) => update (state, lastPage),
      [text ("last "), icon ({ fas: true, "fa-angle-double-right": true })],
      data.value !== lastPage
    )

  return h ("div", {
    ...etc,
    class: {
      disabled,
      locked,
      "uy-control": true,
      "uy-pager": true,
      [etc.class]: !!etc.class,
    },
  }, [
    h ("ul", {}, [
      h ("li", {}, [navFirst]),
      h ("li", {}, [navPrev]),
      h ("li", {}, [morePrev]),
      ...pages,
      h ("li", {}, [moreNext]),
      h ("li", {}, [navNext]),
      h ("li", {}, [navLast]),
    ]),
  ])
}

const pager: Control = component (rawPager)

export { freshPager, pager }
