import type { Dispatch, EffectDescriptor, Payload } from "hyperapp"

const runScrollIntoView = <S>(_dispatch: Dispatch<S>, el?: Payload<Element>) => {
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

const scrollIntoView = <S>(el: Payload<Element>): EffectDescriptor<S, Element> => {
  return [runScrollIntoView, el]
}

export { scrollIntoView }
