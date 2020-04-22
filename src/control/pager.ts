import { h } from "hyperapp"
import { component } from "../component"
import { icon } from "../display/icon"
import { range } from "../utility/utility"

// freshPager :: Int -> Int -> PagerData
const freshPager = (itemsTotal: number) => (value: number): any => ({ value, itemsTotal })

// pagerNav :: AnyFunction -> [VNode] -> Bool -> VNode
const pagerNav = (handler: Function, contents: any[], active: boolean): any =>
  h("span", {
    class: {
      "uy-pager-nav": true,
      "uy-pager-nav-inactive": !active,
    },
    ...active ? { onclick: (_state: any, _event: any) => handler } : {},
  }, contents)

// pagerMore :: [VNode] -> VNode
const pagerMore = (contents: any[]): any => h("span", { class: "uy-pager-more" }, contents)

// rawPager :: PagerOptions -> Object -> VNode
const rawPager = ({ disabled, locked, itemsPerPage, pageRange, update, ...etc }: any) => (data: any): any => {
  if (!data.itemsTotal) return null

  const pageCount = Math.ceil(data.itemsTotal / itemsPerPage)
  const lastPage = pageCount - 1

  const updateToPrev = update(Math.max(0, data.value - 1))
  const updateToNext = update(Math.min(lastPage, data.value + 1))

  const rangeStartPage = Math.max(0, data.value - pageRange)
  const rangeFinishPage = Math.min(lastPage, data.value + pageRange)

  const pages = range(0)(rangeFinishPage - rangeStartPage + 1).map((n: number) => {
    const currentPage = rangeStartPage + n
    const current = currentPage === data.value
    return rangeStartPage <= currentPage && currentPage <= rangeFinishPage
      ? h("li", {
        class: {
          "uy-pager-nav": true,
          "uy-pager-page": true,
          "uy-pager-current": current,
        },
        onclick: (_state: any, _event: any) => update(currentPage),
      }, [h("span", {}, [currentPage + 1])])
      : null
  })

  const morePrev = pagerMore([rangeStartPage > 0 ? "..." : ""])
  const moreNext = pagerMore([rangeFinishPage < lastPage ? "..." : ""])

  const navFirst =
    pagerNav(
      update(0),
      [icon({ fas: true, "fa-angle-double-left": true }), " first"],
      data.value !== 0,
    )

  const navPrev =
    pagerNav(
      updateToPrev,
      [icon({ fas: true, "fa-angle-left": true }), " prev"],
      data.value !== 0,
    )

  const navNext =
    pagerNav(
      updateToNext,
      ["next ", icon({ fas: true, "fa-angle-right": true })],
      data.value !== lastPage,
    )

  const navLast =
    pagerNav(
      update(lastPage),
      ["last ", icon({ fas: true, "fa-angle-double-right": true })],
      data.value !== lastPage,
    )

  return h("div", {
    ...etc,
    class: {
      disabled,
      locked,
      "uy-control": true,
      "uy-pager": true,
      [etc.class]: !!etc.class,
    },
  }, [
    h("ul", {}, [
      h("li", {}, [navFirst]),
      h("li", {}, [navPrev]),
      h("li", {}, [morePrev]),
      ...pages,
      h("li", {}, [moreNext]),
      h("li", {}, [navNext]),
      h("li", {}, [navLast]),
    ]),
  ])
}

// pager :: ControlOptions -> [String] -> State -> VNode
const pager = component(rawPager)

export { freshPager, pager }
