export type Wiring<R extends Record<string, any>, D> = Readonly<{
  data: (r: R) => D
  update: (r: R, x: D) => R
}>

const wire = <R extends Record<string, any>, D>
  (prop: string, context?: Wiring<R, D>): Wiring<R, D> => ({
    data: (r) => context
      ? (context.data(r) as Record<string, any>)[prop]
      : r[prop],
    update: (r, x) => context
      ? context.update(r, { ...context.data(r), [prop]: x })
      : { ...r, [prop]: x },
  })

export { wire }
