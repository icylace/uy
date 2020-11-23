import type { State } from "hyperapp"

export type Wiring<D, S = Record<string | number, any>> = Readonly<{
  get: (state: State<S>) => D
  mod: (state: State<S>, f: (_: D) => D) => State<S>
  set: (state: State<S>, x: D) => State<S>
}>

const cable = <S extends Record<string | number, any>>(
  path: (string | number)[],
  context?: Wiring<Record<string | number, any>, S>
): Wiring<any, S> | undefined => {
  return path.reduce((ctx, x) => wire(x, ctx), context)
}

const wire = <D, S extends Record<string | number, any> = Record<string | number, any>>(
  prop: string | number,
  context?: Wiring<Record<string | number, any>, S>
): Wiring<D, S> => ({
  get: (state) => {
    if (context) {
      const r = context.get(state)
      return r[prop]
    }
    return state[prop]
  },
  mod: (state, f) => {
    if (context) {
      const r = context.get(state)
      return context.set(state, { ...r, [prop]: f(r[prop]) })
    }
    return { ...state, [prop]: f(state[prop]) }
  },
  set: (state, x) => {
    if (context) {
      const r = context.get(state)
      return context.set(state, { ...r, [prop]: x })
    }
    return { ...state, [prop]: x }
  },
})

export { cable, wire }
