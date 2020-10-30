import type { State } from "hyperapp"

export type Wiring<S, D> = Readonly<{
  get: (state: State<S>) => D
  mod: (state: State<S>, f: (_: D) => D) => State<S>
  set: (state: State<S>, x: D) => State<S>
}>

const wire = <S extends Record<string, any>, D>
  (prop: string, context?: Wiring<S, Record<string, any>>): Wiring<S, D> => ({
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

export { wire }
