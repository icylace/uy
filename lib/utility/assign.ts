export { assign }

// -----------------------------------------------------------------------------

const assign = <T>(value: any, i: number, xs: readonly T[]): T[] =>
  [...xs.slice(0, i), value, ...xs.slice(i + 1)]
