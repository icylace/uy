import type { Effect } from "hyperapp"

import { fx } from "../utility/hyperappHelper"

const runScrollIntoView = (
  (_dispatch, el) => {
    if (!el) return
    el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
  }
) as Effect<unknown, unknown, Element>

export const scrollIntoView = (el: Element) =>
  fx (runScrollIntoView) (el)
