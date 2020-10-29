export type Wiring<R extends Record<string, any>, D> = Readonly<{
  get: (r: R) => D
  mod: (r: R, x: D) => R
  set: (r: R, x: D) => R
}>

// export type Wiring<R extends Record<string, any>, D> = Readonly<{
//   data: (r: R) => D
//   update: (r: R, x: D) => R
// }>

// const wire = <R extends Record<string, any>, D>
//   (prop: string, context?: Wiring<R, D>): Wiring<R, D> => ({
//     data: (r) => context
//       ? (context.data(r) as Record<string, any>)[prop]
//       : r[prop],
//     update: (r, x) => context
//       ? context.update(r, { ...context.data(r), [prop]: x })
//       : { ...r, [prop]: x },
//   })

const wire = <R extends Record<string, any>, D>
  (prop: string, context?: Wiring<R, D>): Wiring<R, D> => ({
    get: (r) => context
      ? (context.get(r) as Record<string, any>)[prop]
      : r[prop],
    set: (r, x) => context
      ? context.set(r, { ...context.get(r), [prop]: x })
      : { ...r, [prop]: x },
  })

export { wire }
