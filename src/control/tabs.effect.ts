import type { Dispatch, Effect, EffectDescriptor } from "hyperapp"

import { fx } from "../utility/hyperappHelper"

const runScrollIntoView = ((_dispatch: Dispatch<unknown>, el: Element): void => {
  el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
}) as Effect<unknown>

export const scrollIntoView = (el: Element): EffectDescriptor<unknown> =>
  fx (runScrollIntoView) (el)
