export { encase }

// -----------------------------------------------------------------------------

const encase = <T>(x: T | readonly T[]): T[] =>
  Array.isArray(x) ? x : [x]
