import type { Dispatch, Effect, EffectData, EffectDescriptor } from "hyperapp"

import { fx } from "../utility/hyperappHelper"

export type FxData = { el: Element }

const runScrollIntoView = <D extends FxData>(_dispatch: Dispatch, props: EffectData<D>): void => {
  props.el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
}

export const scrollIntoView = <D extends FxData>(el: Element): EffectDescriptor<D> =>
  fx (runScrollIntoView as Effect) ({ el } as D)
