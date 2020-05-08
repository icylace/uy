import { fx } from "../utility/hyperappHelper"

const runScrollIntoView = (_dispatch: Function, el: any): void => {
  if (!el) return
  el.scrollIntoView ({ behavior: "smooth", block: "nearest" })
}

// scrollIntoView :: DOMElement -> [EffectRunner, Object]
const scrollIntoView = fx (runScrollIntoView)

export { scrollIntoView }
