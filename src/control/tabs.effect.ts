const runScrollIntoView = (_dispatch: Function, el: any): void => {
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

const scrollIntoView = (el: any): any[] => [runScrollIntoView, el]

export { scrollIntoView }
