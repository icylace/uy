import type { Dispatch, Effect, EffectData, EffectDescriptor } from "hyperapp"

import { fx } from "../utility/hyperappHelper"

const runScrollIntoView = (_dispatch: Dispatch, el: EffectData<Element>): void => {
  el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
}

export const scrollIntoView = (el: Element): EffectDescriptor<Element> =>
  fx (runScrollIntoView as Effect) (el)
