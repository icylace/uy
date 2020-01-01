import { h } from "../hyperappHelper.js"
import { box } from "../utility.js"

// pager :: PagerOptions -> VNode
const pager = ({ itemsTotal, itemsPerPage, page, pageRange, updater }) => {
  if (!itemsTotal) return null

  const pageCount = Math.ceil(itemsTotal / itemsPerPage)
  const lastPage = pageCount - 1

  const updateToPrev = state => updater(Math.max(0, state.data.page - 1))
  const updateToNext = state => updater(Math.min(lastPage, state.data.page + 1))

  const rangeStartPage = Math.max(0, page - pageRange)
  const rangeFinishPage = Math.min(lastPage, page + pageRange)

  const pages = Array(rangeFinishPage - rangeStartPage + 1)
    .fill()
    .map((_, i) => {
      const currentPage = rangeStartPage + i
      const active = currentPage === page
      return rangeStartPage <= currentPage <= rangeFinishPage
        ? h(
            "li",
            active
              ? { class: "uy-pager-page uy-pager-active" }
              : { class: "uy-pager-page", onclick: updater(currentPage) },
            [h("span", {}, currentPage + 1)],
          )
        : null
    })

  const attrsForFirst = page === 0 ? { class: "uy-pager-page" } : { class: "uy-pager-page", onclick: updater(0) }
  const attrsForPrev = page === 0 ? { class: "uy-pager-page" } : { class: "uy-pager-page", onclick: updateToPrev }
  const attrsForNext =
    page === lastPage ? { class: "uy-pager-page" } : { class: "uy-pager-page", onclick: updateToNext }
  const attrsForLast =
    page === lastPage ? { class: "uy-pager-page" } : { class: "uy-pager-page", onclick: updater(lastPage) }

  return box("uy-control", [
    h("ul", { class: "uy-pager" }, [
      h("li", {}, [h("span", attrsForFirst, "« first")]),
      h("li", {}, [h("span", attrsForPrev, "‹ prev")]),
      h("li", {}, [h("span", { class: "uy-pager-more" }, rangeStartPage > 0 ? "....." : "")]),
      ...pages,
      h("li", {}, [h("span", { class: "uy-pager-more" }, rangeFinishPage < lastPage ? "....." : "")]),
      h("li", {}, [h("span", attrsForNext, "next ›")]),
      h("li", {}, [h("span", attrsForLast, "last »")]),
    ]),
  ])
}

export { pager }
