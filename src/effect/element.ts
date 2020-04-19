const runAddClass = (_dispatch: Function, { className, el }: any): any => {
  if (!el) return
  el.classList.add(className)
}

const addClass = (className: string) => (el: any): any => [runAddClass, { className, el }]

// -----------------------------------------------------------------------------

const runRemoveClass = (_dispatch: Function, { className, el }: any): any => {
  if (!el) return
  el.classList.remove(className)
}

const removeClass = (className: string) => (el: any): any => [runRemoveClass, { className, el }]

// -----------------------------------------------------------------------------

export { addClass, removeClass }
