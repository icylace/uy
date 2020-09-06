import type { Dispatch, Effect, EffectDescriptor } from "hyperapp"

import { fx } from "../utility/hyperappHelper"

const runScrollIntoView = <S>(_dispatch: Dispatch<S>, el: Element): void => {
  el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
}

export const scrollIntoView = <S>(el: Element): EffectDescriptor<S> =>
  fx (runScrollIntoView as Effect<S>) (el)
