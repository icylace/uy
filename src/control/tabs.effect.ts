import type { Dispatch, Effect, EffectDescriptor } from "hyperapp"

import { fx } from "../utility/hyperappHelper"

type FxData = { el: Element }

const runScrollIntoView = (_dispatch: Dispatch, props: FxData): void => {
  props.el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
}

const scrollIntoView = (el: Element): EffectDescriptor<FxData> =>
  fx (runScrollIntoView as Effect) ({ el })

export { scrollIntoView }
