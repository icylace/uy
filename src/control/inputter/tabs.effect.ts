import type { Dispatch, EffectDescriptor, Payload } from "hyperapp"

const runScrollIntoView = <S>(_dispatch: Dispatch<S>, el?: Payload<Element>): void =>
  el && el.scrollIntoView({ behavior: "smooth", block: "nearest" })

export const scrollIntoView = <S>(el: Payload<Element>): EffectDescriptor<S, Element> =>
  [runScrollIntoView, el]
