export const encase = <T>(x: T | readonly T[]): readonly T[] =>
  Array.isArray(x) ? x : [x]
