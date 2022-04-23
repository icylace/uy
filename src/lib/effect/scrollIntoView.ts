import type { Dispatch, Effect } from "hyperapp"

export { scrollIntoView }

// -----------------------------------------------------------------------------

const runScrollIntoView = <S>(_dispatch: Dispatch<S>, el: Element): void =>
  el.scrollIntoView({ behavior: "smooth", block: "nearest" })

const scrollIntoView = <S>(el: Element): Effect<S, Element> =>
  [runScrollIntoView, el]
